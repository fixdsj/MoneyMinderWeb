<template>
  <div>
    <h3 class="text-center mb-4">Mon solde total = 3<i class="bi bi-currency-euro"></i></h3>
    <div class="maincontainer">
      <div class="sidebar">

        <ul class="list-group">
          <li class="list-group-item">Mes groupes</li>
          <li class="list-group-item" v-for="groupe in groupes" :key="groupe.id" @click="selectGroupe(groupe)"
              :class="{'groupeactif': groupeActif && groupe.id === groupeActif.id}">
            <a onclick="" role="button" class="btn">{{ groupe.nom }}: (Solde ={{ groupe.soldes }}€)</a>
          </li>
          <li class="list-group-item">
            <a href="/account" role="button" class="btn">Créer un groupe</a>
          </li>
        </ul>
      </div>

      <div class="contentcontainer">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <p class="nav-link" @click="selectTab('depenses')" :class="{ 'selectedtab': selectedTab === 'depenses' }">
              Dépenses</p>
          </li>
          <li class="nav-item">
            <p class="nav-link" @click="selectTab('refunds')" :class="{ 'selectedtab': selectedTab === 'refunds' }">
              Remboursements</p>
          </li>
          <li class="nav-item">
            <p class="nav-link" @click="selectTab('historique')"
               :class="{ 'selectedtab': selectedTab === 'historique' }">
              Historique</p>
          </li>
          <li class="nav-item">
            <p class="nav-link" @click="selectTab('details')" :class="{ 'selectedtab': selectedTab === 'details' }">
              Détails</p>
          </li>
        </ul>

        <div class="details">
          <h2>{{ groupeActif?.nom }}</h2>
          <p>{{ groupeActif?.description }}</p>
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
      groupes: [
        {id: 1, nom: 'Groupe A', description: 'Description du Groupe A', soldes: 0},
        {id: 2, nom: 'Groupe B', description: 'Description du Groupe B', soldes: 29},
        {id: 3, nom: 'Groupe C', description: 'Description du Groupe C', soldes: 0},
        {id: 4, nom: 'Groupe D', description: 'Description du Groupe D', soldes: 656},
        {id: 5, nom: 'Groupe E', description: 'Description du Groupe E', soldes: -56}
      ],
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
    // Sélection du premier groupe par défaut
    if (this.groupes.length > 0) {
      this.groupeActif = this.groupes[0];
    }
  },
  methods: {
    selectGroupe(groupe) {
      this.groupeActif = groupe;
    },
    selectTab(tab) {
      this.selectedTab = tab;
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
