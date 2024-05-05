<template>

  <template v-if="transactions.length === 0">
    <div class="text-center">
      <p class="text-center">Aucune transaction</p>
      <i class="bi bi-check-circle" style="font-size: 60px; color:green"></i>
    </div>
  </template>
  <div id="accordionExample" class="accordion">
    <div v-for="(transaction, index) in transactions" :key="index" class="accordion-item">
      <h2 :id="'heading' + index" class="accordion-header">
        <button :aria-controls="'collapse' + index" :data-bs-target="'#collapse' + index"
                aria-expanded="false" class="accordion-button collapsed"
                data-bs-toggle="collapse" type="button">
          {{ transaction.createdBy }} - {{ transaction.amount }}€ -
          {{ transaction.date.toLocaleString('fr-FR', dateOptions) }} &nbsp;
          <span class="badge bg-secondary"
                style="text-transform: uppercase">{{
              transaction.categorie
            }}</span>
        </button>
      </h2>
      <div :id="'collapse' + index" aria-labelledby="'heading' + index" class="accordion-collapse collapse"
           data-bs-parent="#accordionExample">

        <div class="accordion-body container">
          <div class="d-flex justify-content-between">
            <p><strong>Description:</strong> {{ transaction.description }}</p>
            <div class="text-end d-flex">
              <p class="text-end "><strong>Télécharger le justificatif:</strong></p>
              <i class="bi bi-file-earmark-arrow-down" type="button" @click="downloadProof(transaction)"></i>
            </div>
          </div>
          <hr>
          <div class="d-flex justify-content-between">
            <p>
              <strong>Membres concernés: </strong>
              <span
                  :class="transaction.membresconcernes.every(member => member.paidAt) ? 'text-success' : 'text-danger'">{{
                  transaction.membresconcernes.map(member => member.userName).join(', ')
                }}</span>
            </p>


            <div>
              <p class="text-end"><strong>Catégorie:</strong> {{ transaction.categorie }}</p>
            </div>
          </div>
          <hr>
          <div class="mb-3 d-flex align-items-center">
            <label class="form-label" for="formFile"><strong>Changer le justificatif:</strong></label>
            <input id="formFile" accept="image/png, image/jpeg, image/jpg,application/pdf" class="form-control form-control-sm"
                   type="file"
                   @change="justificatif = $event.target.files[0]">
            <button v-if="justificatif" class="btn btn-info ms-2" @click="uploadProof(transaction.id)">Changer</button>
          </div>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
import {currentUsername} from "@/main";


export default {
  name: 'AppLastTransactions',
  props: {
    activeGroup: Object
  },
  data() {
    return {
      currentUsername: currentUsername,
      dateOptions: {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      },
      justificatif: null,
      transactions: [],
    };
  },
  methods: {
    async uploadProof(transactionId) {
      console.log('Upload du justificatif');
      try {
        const axios = require('axios');
        const response = await axios.post('${process.env.VUE_APP_API_URL}', {
          query: `mutation{uploadExpenseJustification(expenseId: "${transactionId}")}`
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });
        const responseData = response.data;
        if (responseData.data.uploadExpenseJustification) {
          const uploadUrl = responseData.data.uploadExpenseJustification;
          const formData = new FormData();
          formData.append('file', this.justificatif);
          const uploadResponse = await axios.post(uploadUrl, formData);
          console.log('uploadResponse', uploadResponse);
          this.justificatif = null;
        }
      } catch (error) {
        console.error('Erreur:', error);
      }

    },
    async downloadProof(transaction) {
      console.log('Téléchargement du justificatif');
      try {
        const axios = require('axios');
        const response = await axios.post('${process.env.VUE_APP_API_URL}', {
          query: `mutation{expenseJustification(expenseId: "${transaction.id}")} `
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
          },
        });
        const responseData = response.data;
        if (responseData.data && responseData.data.expenseJustification) {
          const downloadUrl = responseData.data.expenseJustification;
          const downloadResponse = await axios.get(downloadUrl, {
            responseType: 'blob',
          });

          // Extracting file extension
          const contentType = downloadResponse.headers['content-type'];
          const extension = contentType.split('/')[1];

          // Creating file name with extension
          const fileName = `justificatif_${transaction.date.toLocaleString('fr-FR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          })}.${extension}`;

          // Creating download link
          const url = window.URL.createObjectURL(new Blob([downloadResponse.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', fileName);
          document.body.appendChild(link);
          link.click();
        }
        if (responseData.errors) {
          console.log("erreur" + responseData.errors.message);
        }
      } catch (error) {
        console.error('Erreur:', error);
      }
    },

    async fetchLastTransactions() {
      try {
        const axios = require('axios');
        const response = await axios.post('${process.env.VUE_APP_API_URL}', {
          query: `query {
  groups(where: { name: { contains: "${this.activeGroup.name}" } }) {
    expenses {
      createdBy{userName}
      description
      id
      amount
      createdAt,
      userExpenses {
        paidAt
        user {
          userName
        }
        amount
      }
    }
  }
}`
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
          },
        });
        const responseData = response.data;
        if (responseData.data) {
          this.transactions = responseData.data.groups[0].expenses.map((transaction) => {
            return {
              createdBy: transaction.createdBy.userName,
              amount: transaction.amount,
              date: new Date(transaction.createdAt),
              type: 'remboursement',
              description: transaction.description,
              membresconcernes: transaction.userExpenses.map((userExpense) => ({
                userName: userExpense.user.userName,
                paidAt: userExpense.paidAt
              })),
              categorie: 'Sorties',
              id: transaction.id,

            };
          })
        }
        if (responseData.errors) {
          console.log("erreur" + responseData.errors.message);
        }

      } catch (error) {
        console.error('Erreur:', error);
      }
    },
  },
  mounted() {
    this.fetchLastTransactions();
  },
  watch: {
    activeGroup() {
      this.fetchLastTransactions();
    }
  }
};
</script>

<style scoped>
.notRefunded {
  background-color: #f8d7da;
  color: #721c24;
}

.refunded {
  background-color: #d1ecf1;
  color: #0c5460;
}


</style>
