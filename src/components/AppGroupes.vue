<template>
  <div>
    <div class="maincontainer tab-content col-10">
      <div class="sidebar">
        <h5 class="text-center">Groupes</h5>
        <div aria-label="Liste des groupes" class="btn-group-vertical " role="group">
          <a v-if="groupes.length === 0" class="btn btn-secondary fst-italic" type="button">Aucun groupe</a>
          <a v-for="groupe in groupes" :key="groupe.id" :class="{'activeGroup': groupe.name === activeGroup.name}"
             class="btn btn-secondary" type="button" @click="selectGroupe(groupe)">
            {{ groupe.name }}: (Solde:{{ groupe.balance }}€)
          </a>
          <a class="btn btn-secondary my-auto" href="/account" role="button">Créer un groupe</a>
        </div>
      </div>

      <div class="contentcontainer">
        <ul id="myTab" class="nav nav-tabs" role="tablist">
          <li class="nav-item" role="presentation">
            <button id="expense-tab" aria-controls="expense-tab-pane" aria-selected="true" class="nav-link active"
                    data-bs-target="#expense-tab-pane" data-bs-toggle="tab" role="tab" type="button">Dépenses
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button id="refund-tab" aria-controls="refund-tab-pane" aria-selected="false" class="nav-link"
                    data-bs-target="#refund-tab-pane" data-bs-toggle="tab" role="tab" type="button">Remboursements
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button id="lasttransaction-tab" aria-controls="lasttransaction-tab-pane" aria-selected="false"
                    class="nav-link" data-bs-target="#lasttransaction-tab-pane" data-bs-toggle="tab"
                    role="tab" type="button">Historique
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button id="groupedetail-tab" aria-controls="groupedetail-tab-pane" aria-selected="false" class="nav-link"
                    data-bs-target="#groupedetail-tab-pane" data-bs-toggle="tab" role="tab" type="button">Détails
            </button>
          </li>

        </ul>
        <div class="d-flex align-items-center">
          <img alt="Photo de groupe" class="rounded-circle mr-3"
               height="50" src="https://mehedihtml.com/chatbox/assets/img/user.png" width="50">
          <h5 class="mb-0">{{ activeGroup.name }}</h5>
        </div>
        <div id="myTabContent" class="tab-content">
          <div id="expense-tab-pane" aria-labelledby="expense-tab" class="tab-pane fade show active" role="tabpanel"
               tabindex="0">
            <AppExpenses :activeGroup="activeGroup"/>
          </div>
          <div id="refund-tab-pane" aria-labelledby="refund-tab" class="tab-pane fade" role="tabpanel" tabindex="0">
            <AppRefunds :activeGroup="activeGroup"/>
          </div>
          <div id="lasttransaction-tab-pane" aria-labelledby="lasttransaction-tab" class="tab-pane fade" role="tabpanel"
               tabindex="0">
            <AppLastTransactions/>
          </div>
          <div id="groupedetail-tab-pane" aria-labelledby="groupedetail-tab" class="tab-pane fade" role="tabpanel"
               tabindex="0">
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
      activeGroup: [],
    };
  },
  mounted() {
    this.fetchCurrentUserGroups();
  },

  methods: {
    selectGroupe(groupe) {
      this.activeGroup = groupe;
    },
    async fetchCurrentUserGroups() {
      try {
        const axios = require('axios');
        const response = await axios.post('${process.env.VUE_APP_API_URL}', {
          query: `{currentUser{userGroups{user{balance},group{name,groupImageUrl}}}}`
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
              balance: groupe.user.balance,
              groupImageUrl: groupe.group.groupImageUrl,
            };
          });
          this.activeGroup = this.groupes[0];
          console.log('Groupe actif:', this.activeGroup);
        }
      } catch (error) {
        console.error('Erreur:', error);
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


h1 {
  text-align: center;
  margin: 20px;
}

.activeGroup {
  background-color: var(--second-background-color);
  border: none;
}

</style>
