<template>
  <div>
    <div v-if="hasNoRib" class="alert alert-info alert-dismissible fade show" role="alert">
      <strong>L'utilisateur n'a pas de RIB enregistré.</strong> Il doit enregistrer un RIB pour pouvoir recevoir des
      remboursements.
      <div class="my-auto">
        <button aria-label="Close" class="btn-close" data-bs-dismiss="alert" type="button"></button>
      </div>
    </div>
    <div class="container justify-content-center d-flex">
      <div class="col-md-5 text-md-center">
        <h3 class="text-center mb-4">Paiement rapide</h3>
        <p class="text-center mt-1"> Vous devez rembourser 27<i class="bi bi-currency-euro"></i> à votre groupe</p>
        <p class="text-center mt-4">Montant total à rembourser : 27<i class="bi bi-currency-euro"></i></p>
        <button class="btn btn-primary justify-content-center" type="button" @click="paidDue">
          Payer 10€ au groupe {{ activeGroup.name }}
        </button>
      </div>


      <hr>
      <div class="col-md-5 text-md-center">
        <h3 class="text-center mb-4">Paiement détaillé</h3>
        <ul class="list-group">
          <li v-for="expense in userExpenses" :key="expense.id" class="list-group-item">
            <p class="bi-text-right text-bg-light border border-info rounded">Le
              {{ formatDate(expense.expense.createdAt) }}</p>
            <p class="text-center fst-italic">{{ expense.expense.description }}</p>
            <p class="text-center">Dépense de <span class="fw-bold">{{ expense.expense.amount }}€</span> créée par
              {{ expense.expense.createdBy.userName }}</p>
            <p class="text-center">Vous devez rembourser {{ expense.amount }}€</p>
            <div class="text-center d-flex justify-content-around">
              <button class="btn btn-primary font-monospace" type="button" @click="paywithPaypal()">
                Payer avec Paypal
              </button>
              <button class="btn btn-primary font-monospace" type="button" @click="payWithRib()">
                Faire un virement
              </button>
            </div>
          </li>
        </ul>
        <div v-if="userExpenses.length === 0" class="text-center">
          <p class="text-center">Aucune dépense à rembourser.</p>
        </div>
      </div>
    </div>
    <div class="mt-2 mx-2 bg-light rounded">
      <BarChart/>
    </div>
    <!-- Graphique -->
  </div>

</template>

<script>
import BarChart from "@/components/BarChart.vue";

export default {
  name: 'AppRefunds',
  props: {
    activeGroup: Object,
  },
  components: {BarChart},
  data() {
    return {
      groupExpenses: [],
      userExpenses: [],
      hasNoRib: false,
      chartData: {
        labels: ['January', 'February', 'March'],
        datasets: [{data: [40, 20, 12]}],
      },
      chartOptions: {
        responsive: true,
      },
    };
  },
  methods: {
    paywithPaypal() {
      console.log('Payer avec Paypal');
    },
    payWithRib() {
      console.log('Payer avec un RIB');
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
          this.userExpenses = responseData.data.currentUser.userExpenses;
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
    this.fetchExpensesCurrrentUser();
  },
};
</script>

<style scoped>
.list-group-item {
  margin-top: 10px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: var(--main-background-color);
}
</style>
