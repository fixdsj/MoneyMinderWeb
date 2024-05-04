<template>
  <div class="col-md-10 mx-auto col-lg-5 app-depenses">
    <h3 class="text-center mb-4">Créer une dépense</h3>
    <div v-if="successAlert" class="alert alert-success alert-dismissible fade show" role="alert">
      <strong>Dépense envoyée!</strong> Vous pouvez maintenant ajouter un justificatif.
      <button aria-label="Close" class="btn-close" data-bs-dismiss="alert" type="button"></button>
    </div>
    <form v-if="currentStep === 1" @submit.prevent="submitDepense">
      <div class="stepwizard">
        <div class="stepwizard-row setup-panel">
          <div class="stepwizard-step">
            <a class="btn btn-primary btn-circle" type="button">1</a>
            <p>Step 1</p>
          </div>
          <div class="stepwizard-step">
            <a class="btn btn-default btn-circle" disabled="disabled" type="button">2</a>
            <p>Step 2</p>
          </div>
        </div>
      </div>
      <!-- Première étape -->

      <div class="mb-3">
        <label class="form-label" for="description">Titre:</label>
        <input id="description" v-model="depense.description" class="form-control" placeholder="Titre de la dépense"
               required
               type="text"/>
      </div>

      <div class="mb-3">
        <label class="form-label" for="montant">Montant:</label>
        <div class="input-group">
          <span class="input-group-text">€</span>
          <input id="montant" v-model="depense.montant" class="form-control" step="5" type="number" v-bind:min="0"
                 @input="previewRefunds()"/>
        </div>

      </div>

      <div class="mb-3">
        <div class="d-flex justify-content-between ">
          <label class="form-label">Utilisateurs concernés:</label>
          <button v-if="selectedsUsers.length === 0" class="btn btn-link" type="button" @click="selectAllUsers">Tout
            sélectionner
          </button>
          <button v-else class="btn btn-link" type="button" @click="unselectUsers">Tout supprimer</button>
        </div>

        <input id="weightedinput" v-model="texttosuggest" class="form-control" placeholder="Ajouter un utilisateur..."
               type="text" @input="suggestUsers">

        <ul class="list-group">
          <li v-for="user in suggestedUsers" :key="user.id"
              class="list-group-item d-flex justify-content-between align-items-center" @click="selectUser(user)">
            {{ user.userName }}
            <button class="btn btn-primary">+</button>
          </li>
          <li v-if="suggestedUsers.length === 0 && texttosuggest.length > 1"
              class="list-group-item d-flex justify-content-between align-items-center">
            Aucun utilisateur trouvé
          </li>
        </ul>

        <ul class="list-group mt-2">
          <li v-for="user in selectedsUsers"
              :key="user.id"
              class="list-group-item d-flex justify-content-center align-items-center p-0">
            <span class="input-group-text rounded-0">{{ user.userName }}</span>
            <input v-model="user.weight" :placeholder="getUserPreviewAmount(user.id)"
                   class="form-control input-group rounded-0"
                   step="1"
                   type="number" v-bind:min="0">
            <button class="btn btn-danger rounded-0" @click="removeUserFromSelected(user)"><i class="bi bi-trash"></i>
            </button>
          </li>
        </ul>
      </div>
      <!--      <div class="mb-3">
              <label class="form-label" for="categorie">Catégorie:</label>
              <select id="categorie" class="form-select">
                <option value="alimentation">Alimentation</option>
                <option value="sorties">Sorties</option>
                <option value="logement">Logement</option>
                <option value="transport">Transport</option>
                <option value="divers">Divers</option>
              </select>
            </div>-->

      <div v-if="!isExpenseLoading"
           class="mb-3 text-center">
        <button class="btn btn-primary" type="button" @click="submitDepense">Créer la dépense</button>
      </div>
      <div v-if="isExpenseLoading" class="mb-3 text-center">
        <button class="btn btn-primary" disabled type="button">
          <span aria-hidden="true" class="spinner-border spinner-border-sm" role="status"></span>
          Chargement...
        </button>
      </div>
    </form>

    <form v-if="currentStep === 2" @submit.prevent="submitJustificatif">
      <div class="stepwizard">
        <div class="stepwizard-row setup-panel">
          <div class="stepwizard-step">
            <a class="btn btn-default btn-circle" type="button">1</a>
            <p>Step 1</p>
          </div>
          <div class="stepwizard-step">
            <a class="btn btn-primary btn-circle" disabled="disabled" type="button">2</a>
            <p>Step 2</p>
          </div>
        </div>
      </div>
      <!-- Deuxième étape -->
      <div class="mb-3">
        <label class="form-label" for="proof">Justificatif (facultatif):</label>
        <input id="proof" accept="image/png, image/jpeg, image/jpg, application/pdf"
               class="form-control" type="file"
               @change="handleFileChange"/>
      </div>
      <div class="mb-3 text-center">
        <button class="btn btn-primary" type="submit">Envoyer le justificatif</button>
      </div>


    </form>
  </div>

</template>

<script>

export default {
  name: 'AppExpenses',
  props: {
    activeGroup: Object,
  },
  data() {
    return {
      isExpenseLoading: false,
      successAlert: false,
      currentStep: 1,
      depense: {
        montant: 0,
        description: '',
        date: '',
      },
      justificatif: null,

      //Notification
      alertMessage: '',


      //Suggestions
      usersInGroup: [],
      texttosuggest: '',
      selectedsUsers: [],
      suggestedUsers: [],


      //Preview expense
      expensesPreview: [],

      //Justificatif

      expenseId: null,


    };
  },
  methods: {
    async submitDepense() {
      try {
        this.isExpenseLoading = true;
        this.weightquery = this.selectedsUsers.map((user) => {
          if (user.weight !== undefined) {
            return `{key:"${user.id}",value:${user.weight}}`;
          } else {
            return `{key:"${user.id}"}`;
          }
        }).join(',');
        const axios = require('axios');
        const response = await axios.post('${process.env.VUE_APP_API_URL', {
          query: `mutation {
  addUserExpense(
    expenseInsertInput: {
      amount: ${this.depense.montant}
      description: "${this.depense.description}"
      groupId: "${this.activeGroup.id}"
      userAmountsList: [${this.weightquery}]
    }
  ) {
    paidAt
    expense {
      amount, description, id},
    amount
  }
}
`
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
          },
        });
        const responseData = response.data;
        if (responseData.errors) {
          console.log('Erreur : ' + responseData.errors[0].message);
        }
        if (responseData.data) {
          this.successAlert = true;
          this.currentStep++;
          this.expenseId = responseData.data.addUserExpense[0].expense.id;
          this.isExpenseLoading = false;
        }

      } catch (error) {
        console.error('Erreur lors de la création de la dépense', error);
      }

    },
    async submitJustificatif() {
      console.log('Créer une dépense avec justificatif:', this.justificatif);
      try {
        const axios = require('axios');
        const response = await axios.post('${process.env.VUE_APP_API_URL}', {
          query: `mutation{uploadExpenseJustification(expenseId: "${this.expenseId}")}`
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });
        const responseData = response.data;
        console.log('Réponse upload:', responseData);

        if (responseData.data.uploadExpenseJustification) {
          const uploadUrl = responseData.data.uploadExpenseJustification;
          const formData = new FormData();
          formData.append('file', this.justificatif);
          const uploadResponse = await axios.post(uploadUrl, formData);
          console.log('Réponse de l\'upload:', uploadResponse.data);
          this.alertMessage = 'Justificatif envoyé avec succès';
        }
      } catch (error) {
        console.error('Erreur lors de l\'envoi du justificatif', error);
      }
    },
    handleFileChange(event) {
      this.justificatif = event.target.files[0];
    },
    selectUser(user) {
      if (this.selectedsUsers.includes(user)) {
        this.selectedsUsers = this.selectedsUsers.filter((selectedUser) => selectedUser !== user);
        return;
      }
      user.weight = 1;
      this.selectedsUsers.push(user);
      this.suggestedUsers = [];
      this.texttosuggest = '';
    },
    selectAllUsers() {
      this.selectedsUsers = this.usersInGroup;
    },
    unselectUsers() {
      this.selectedsUsers = [];
    },
    removeUserFromSelected(user) {
      this.selectedsUsers = this.selectedsUsers.filter((selectedUser) => selectedUser !== user);
    },

    async fetchMembersGroup() {
      try {
        const axios = require('axios');
        const response = await axios.post('${process.env.VUE_APP_API_URL}', {
          query: `{groupById(id:"${this.activeGroup.id}"){userGroups{user{userName, id}}}}`
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
          },
        });
        const responseData = await response.data;
        if (responseData.errors) {
          console.log('Erreur : ' + responseData.errors[0].message);
        }
        if (responseData.data && responseData.data.groupById.userGroups.length > 0) {
          this.usersInGroup = responseData.data.groupById.userGroups.map((user) => {
            return {
              userName: user.user.userName,
              id: user.user.id,
            };
          });
          this.groupId = responseData.data.groupById.id;
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des membres du groupe', error);
      }

    },

    async suggestUsers() {
      if (this.texttosuggest === '') {
        this.suggestedUsers = [];
      }
      if (this.texttosuggest.length > 1) {
        try {
          const axios = require('axios');
          const response = await axios.post('${process.env.VUE_APP_API_URL}', {
            query: `query {
    users(where: { userName: { startsWith: "${this.texttosuggest}" } }) {
      userName
      id
    }
  }
  `
          }, {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              "Accept": "application/json",
            },
          });
          const responseData = response.data;
          if (responseData.data) {
            this.suggestedUsers = responseData.data.users.filter(user => !this.selectedsUsers.some(selectedUser => selectedUser.id === user.id));

          }
        } catch (error) {
          console.error('Erreur lors de la récupération des utilisateurs', error);
        }
      }
    },
    async previewRefunds() {
      try {
        this.weightquery = this.selectedsUsers.map((user) => {
          if (user.weight !== undefined) {
            return `{key:"${user.id}",value:${user.weight}}`;
          } else {
            return `{key:"${user.id}"}`;
          }
        }).join(',');
        const axios = require('axios');

        const response = await axios.post('${process.env.VUE_APP_API_URL}', {
          query: `query{previsualizeUserExpenses(
  expensePrevisualizationInput:{
    amount:${this.depense.montant},
  groupId:"${this.activeGroup.id}",
  userAmountsList:[
    ${this.weightquery}
    ]
})
  {key,value}}
`
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
          },
        });
        const responseData = response.data;
        if (responseData.data.previsualizeUserExpenses) {
          this.expensesPreview = responseData.data.previsualizeUserExpenses;
        }
      } catch (error) {
        console.error('Erreur lors de la prévisualisation de la dépense', error);
      }
    },

    getUserPreviewAmount(userId) {
      const userPreview = this.expensesPreview.find((user) => user.key === userId);
      if (userPreview) {
        return userPreview.value;
      }
      return 0;


    },
  },
  mounted() {
    this.fetchMembersGroup();
  },
  watch: {
    activeGroup: {
      handler: function (newGroup, oldGroup) {
        if (newGroup !== oldGroup) {
          this.fetchMembersGroup();
          this.selectedsUsers = [];
        }
      },
      deep: true,
    },
  },

};
</script>

<style scoped>
.stepwizard-step p {
  margin-top: 10px;
}

.stepwizard-row {
  display: table-row;
}

.stepwizard {
  display: table;
  width: 100%;
  position: relative;
}

.stepwizard-step button[disabled] {
  opacity: 1 !important;
  filter: alpha(opacity=100) !important;
}

.stepwizard-row:before {
  top: 14px;
  bottom: 0;
  position: absolute;
  content: " ";
  width: 100%;
  height: 1px;
  background-color: #ccc;
  z-index: 0;

}

.stepwizard-step {
  display: table-cell;
  text-align: center;
  position: relative;
}

.btn-circle {
  width: 30px;
  height: 30px;
  text-align: center;
  padding: 6px 0;
  font-size: 12px;
  line-height: 1.428571429;
  border-radius: 15px;
}


</style>

