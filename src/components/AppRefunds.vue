<template>
  <div class="container justify-content-center d-flex">
    <div class="col-md-5 text-md-center">

      <h3 class="text-center mb-4">Paiement rapide</h3>
      <p class="text-center"> Vous devez rembourser 355€ à tous vos groupes </p>
      <p class="text-center"> Soit 27€ + 286€ + 42€</p>
      <button class="btn btn-primary justify-content-center" type="button" @click="paidDue">
        Payer l'intégralité
      </button>
      <hr>
      <p class="text-center mt-1"> Vous devez rembourser 27<i class="bi bi-currency-euro"></i> à votre groupe</p>
      <p class="text-center mt-4">Montant total à rembourser : 27<i class="bi bi-currency-euro"></i></p>
      <button class="btn btn-primary " type="button" @click="paidDue">
        Payer 10€ au groupe {{ activeGroup.name }}
      </button>
    </div>
    <div class="col-md-1">OU</div>
    <div class="col-md-5 text-md-center">
      <h3 class="text-center mb-4">Paiement détaillé</h3>
      <ul class="list-group">
        <li v-for="expense in userExpenses" :key="expense.id" class="list-group-item">
          <p class="bi-text-right text-bg-light">Le {{ formatDate(expense.expense.createdAt) }}</p>
          <p class="text-center fst-italic">{{ expense.expense.description }}</p>
          <p class="text-center">Dépense de <span class="fw-bold">{{ expense.expense.amount }}€</span> créée par
            {{ expense.expense.createdBy.userName }}</p>
          <button class="btn btn-primary font-monospace" type="button" @click="createRemboursement()">
            Rembourser {{ expense.amount }}€
          </button>
        </li>
      </ul>
      <div v-if="userExpenses.length === 0" class="text-center">
        <p class="text-center">Aucune dépense à rembourser</p>
        <i class="bi bi-check-circle" style="font-size: 60px; color:green"></i>
      </div>
    </div>


  </div>
</template>


<script>

export default {
  name: 'AppRefunds',
  props: {
    activeGroup: String,
  },
  data() {
    return {
      groupExpenses: [],
      userExpenses: [],
    };
  },
  methods: {
    createRemboursement() {
      console.log('Effectuer un remboursement');
    },

    async paidDue() {
      console.log('Payer une dette');
    },
    async fetchExpensesInGroup() {
      try {
        const axios = require('axios');
        const response = await axios.post('${process.env.VUE_APP_API_URL}', {
          query: `{groupById(id:"${this.activeGroup}" ){expenses{amount,createdAt, createdBy{userName}}}}`
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
          },
        });
        const responseData = response.data;
        if (responseData) {
          console.log('response data:', responseData);
          this.groupExpenses = responseData.data.groupById.expenses;
          console.log('group expenses:', this.groupExpenses);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des dépenses du groupe', error);
      }

    },
    async fetchExpensesCurrrentUser() {
      try {
        const axios = require('axios');
        const response = await axios.post('${process.env.VUE_APP_API_URL}', {
          query: `{currentUser{userExpenses{amount, paidAt, expense{id,amount, description, createdAt , createdBy{userName}}}}}`
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
          },
        });
        const responseData = response.data;
        if (responseData.data) {
          console.log('response data:', responseData);
          this.userExpenses = responseData.data.currentUser.userExpenses;
          console.log('user expenses:', this.userExpenses);
        }
        if (responseData.errors) {
          console.log('Erreur dans la réponse : ' + responseData.errors[0].message);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des dépenses du groupe', error);
      }
    },
    formatDate(isoDate) {
      const date = new Date(isoDate);
      return date.toLocaleString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      });
    },
  },
  mounted() {
    /*this.fetchExpensesInGroup();*/
    this.fetchExpensesCurrrentUser();
  },
};

</script>


<style scoped>


</style>