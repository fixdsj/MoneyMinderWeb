<template>
  <div>
    <h5 class="text-center mb-4">Mon solde total = 3<i class="bi bi-currency-euro"></i></h5>
    <div class="maincontainer">
      <div class="sidebar">
        <div aria-label="Liste des groupes" class="btn-group-vertical " role="group">
          <button v-if="groupes.length === 0" class="btn btn-secondary fst-italic" type="button">Aucun groupe</button>
          <button v-for="groupe in groupes" :key="groupe.id" :class="{'activeGroup': groupe.name === activeGroup}"
                  class="btn btn-secondary" type="button" @click="selectGroupe(groupe.name)">
            {{ groupe.name }}: (Solde:{{ groupe.soldes }}€)
          </button>
          <a class="btn btn-secondary my-auto" href="/account" role="button">Créer un groupe</a>
        </div>
      </div>

      <div class="contentcontainer">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <p :class="{ 'selectedtab': selectedTab === 'expenses' }" class="nav-link btn tabnav"
               @click="selectTab('expenses')">
              Dépenses</p>
          </li>
          <li class="nav-item">
            <p :class="{ 'selectedtab': selectedTab === 'refunds' }" class="nav-link btn" @click="selectTab('refunds')">
              Remboursements</p>
          </li>
          <li class="nav-item ">
            <p :class="{ 'selectedtab': selectedTab === 'history' }" class="nav-link btn tabnav"
               @click="selectTab('history')">
              Historique</p>
          </li>
          <li class="nav-item ">
            <p :class="{ 'selectedtab': selectedTab === 'details' }" class="nav-link btn tabnav"
               @click="selectTab('details')">
              Détails</p>
          </li>
        </ul>

        <div class="details">
          <h4 class="text-center mb-4">{{ activeGroup }}</h4>
          <hr class="my-4">

          <div v-if="selectedTab === 'expenses'">
            <h3>Dépenses</h3>
            <AppExpenses :activeGroup="activeGroup"/>
          </div>
          <div v-if="selectedTab === 'refunds'">
            <h3>Remboursements</h3>
            <AppRefunds :activeGroup="activeGroup"/>
          </div>

          <div v-if="selectedTab === 'history'">
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
      activeGroup: '',
      selectedTab: 'expenses',
    };
  },
  mounted() {
    this.fetchCurrentUserGroups();
    this.activeGroup = this.groupes[0];
  },
  methods: {
    selectGroupe(groupe) {
      this.activeGroup = groupe;
    },
    selectTab(tab) {
      this.selectedTab = tab;
    },
    async fetchCurrentUserGroups() {
      try {
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
        if (responseData.data.currentUser.userGroups.length > 0) {
          this.groupes = responseData.data.currentUser.userGroups.map((groupe) => {
            return {
              name: groupe.group.name,
              soldes: groupe.user.balance,
            };
          });
          this.activeGroup = this.groupes[0].name;
        }
      } catch (error) {
        console.error('Erreur:', error);
      }

    },

    async previewRefunds() {
      console.log('Prévisualiser les remboursements');
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


.details {
  flex-grow: 1;
  padding: 20px;
}

h1 {
  text-align: center;
  margin: 20px;
}

.activeGroup {
  background-color: var(--second-background-color);
  border: none;
}

.selectedtab {
  background-color: var(--second-background-color);
}

.tabnav:hover {
  background-color: var(--second-background-color);
}

.sidebar button:hover, .sidebar a:hover {
  background-color: var(--second-background-color);
  border: none;
}
</style>
