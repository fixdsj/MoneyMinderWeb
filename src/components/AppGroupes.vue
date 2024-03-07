<template>
  <div>
    <h5 class="text-center mb-4">Mon solde total = 3<i class="bi bi-currency-euro"></i></h5>
    <div class="maincontainer">
      <div class="sidebar">
        <ul class="list-group">
          <li class="list-group-item">Mes groupes</li>
          <li v-for="groupe in groupes" :key="groupe.id" @click="selectGroupe(groupe.name)"
              class="list-group-item" :class="{'groupeactif': groupe.name === groupeActif}">
            <a role="button" class="btn">{{ groupe.name }}: (Solde:{{ groupe.soldes }}€)</a>
          </li>

          <li class="list-group-item">
            <a href="/account" role="button" class="btn">Créer un groupe</a>
          </li>
        </ul>
      </div>

      <div class="contentcontainer">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <p class="nav-link btn" @click="selectTab('depenses')"
               :class="{ 'selectedtab': selectedTab === 'depenses' }">
              Dépenses</p>
          </li>
          <li class="nav-item">
            <p class="nav-link btn" @click="selectTab('refunds')" :class="{ 'selectedtab': selectedTab === 'refunds' }">
              Remboursements</p>
          </li>
          <li class="nav-item">
            <p class="nav-link btn" @click="selectTab('historique')"
               :class="{ 'selectedtab': selectedTab === 'historique' }">
              Historique</p>
          </li>
          <li class="nav-item">
            <p class="nav-link btn" @click="selectTab('details')" :class="{ 'selectedtab': selectedTab === 'details' }">
              Détails</p>
          </li>
        </ul>

        <div class="details">
          <h4 class="text-center mb-4">{{ groupeActif }}</h4>
          <hr class="my-4">

          <div v-if="selectedTab === 'depenses'">
            <h3>Dépenses</h3>
            <AppExpenses/>
          </div>
          <div v-if="selectedTab === 'refunds'">
            <h3>Remboursements</h3>
            <AppRefunds/>
          </div>

          <div v-if="selectedTab === 'historique'">
            <h3>Historique</h3>
            <AppLastTransactions/>
          </div>
          <div v-if="selectedTab === 'details'">
            <h3>Détails du groupe</h3>
            <AppGroupeDetails/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AppRefunds from "@/components/AppRefunds.vue";
import AppExpenses from "@/components/AppExpenses.vue";
import AppLastTransactions from "@/components/AppLastTransactions.vue";
import AppGroupeDetails from "@/components/AppGroupeDetails.vue";

export default {
  name: 'VueGroupes',
  components: {AppLastTransactions, AppRefunds, AppExpenses, AppGroupeDetails},
  data() {
    return {
      groupes: [],
      depenses: [
        {id: 1, montant: 100, destinataire: 'Maurice'},
        {id: 2, montant: 200, destinataire: 'Groupe B'},
        {id: 3, montant: 300, destinataire: 'Groupe C'},
        {id: 4, montant: 400, destinataire: 'Groupe D'}
      ],
      historique: [
        {id: 1, action: 'Remboursement soirée', type: 'remboursement', date: '01/01/2021'},
        {id: 2, action: 'Action 2', type: 'remboursement', date: '02/01/2021'},
        {id: 3, action: 'Action 3', type: 'remboursement', date: '03/01/2021'},
        {id: 4, action: 'Action 4', type: 'remboursement', date: '04/01/2021'}
      ],

      groupeActif: null,
      selectedTab: 'depenses',
    };
  },
  mounted() {
    this.fetchCurrentUserGroups();
  },
  methods: {
    selectGroupe(groupe) {
      this.groupeActif = groupe;
    },
    selectTab(tab) {
      this.selectedTab = tab;
    },
    async fetchCurrentUserGroups() {
      const axios = require('axios');
      const response = await axios.post('http://localhost:3000/graphql', {
        query: `{currentUser{userGroups{user{balance},group{name}}}}`
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          "Accept": "application/json",
        },
      });
      const responseData = response.data;
      if (responseData.data) {
        this.groupes = responseData.data.currentUser[0].userGroups.map((groupe) => {
          return {
            name: groupe.group.name,
            soldes: groupe.user.balance,
          };
        });
        this.groupeActif = this.groupes[0].name;
      }
    },
  },
};
</script>

<style scoped>
.maincontainer {
  display: flex;
}

.contentcontainer {
  flex-grow: 1;
}

.sidebar {
  display: flex;
  height: 70vh;
  overflow-y: auto;
}


/*.sidebar ul li {
  padding: 15px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
}*/


/*.sidebar a {
  padding: 10px;
  cursor: pointer;
  display: block;
  text-align: center;
  text-decoration: none;
  color: inherit;
}*/

.details {
  flex-grow: 1;
  padding: 20px;
}

h1 {
  text-align: center;
  margin: 20px;
}

.groupeactif {
  background-color: var(--second-button-color);
  border-right: solid 2px #721c24;
}

.selectedtab {
  background-color: var(--second-button-color);
  border-bottom: solid 2px #721c24;
}
</style>
