<template>
  <div>
    <div v-if="groups.length > 0 && activeGroup.id" class="tab-content row">
      <div class="col-3">
        <div class="list-group">
          <div class="list-group-item text-center">Groupes</div>
          <div v-for="group in groups" :key="group.id" :class="{'activeGroup': group.name === activeGroup.name}"
               class="list-group-item text-center" type="button" @click="selectGroup(group)">
            {{ group.name }} ({{ group.balance }}€)
          </div>
          <div class="list-group-item my-auto text-center" role="button"
               @click="$router.push('/account')">Créer un groupe
          </div>
          <div v-if="groups.length === 0" class="list-group-item fst-italic" type="button">Aucun groupe</div>
        </div>
        <img src="../assets/illustrations/userwithphone.png" alt="" height="400" width="400" class="img-fluid">
      </div>

      <div class="col-9">
        <ul class="nav nav-tabs" role="tablist">
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
        <div class="d-flex align-items-center p-3 groupHeader">
          <img
              :src="activeGroup.groupImageUrl ? activeGroup.groupImageUrl : 'https://avatar.iran.liara.run/username?username=' + activeGroup.name"
              alt="user img"
              class="img-fluid img-thumbnail rounded-circle"
              style="width: 50px; height: 50px;">
          <h5 class="mb-0">{{ activeGroup.name }}</h5>
        </div>
        <br>
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
            <AppLastTransactions :activeGroup="activeGroup"/>
          </div>
          <div id="groupedetail-tab-pane" aria-labelledby="groupedetail-tab" class="tab-pane fade" role="tabpanel"
               tabindex="0">
            <AppGroupeDetails :activeGroup="activeGroup"/>
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
      groups: [],
      activeGroup: [],
    };
  },
  mounted() {
    this.fetchCurrentUserGroups();
  },

  methods: {
    selectGroup(group) {
      this.activeGroup = group;
    },
    async fetchCurrentUserGroups() {
      try {
        const axios = require('axios');
        const response = await axios.post('${process.env.VUE_APP_API_URL}', {
          query: `{currentUser{userGroups{user{balance},group{name,id,groupImageUrl}}}}`
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
          },
        });
        const responseData = response.data;
        if (responseData.data.currentUser.userGroups.length > 0) {
          this.groups = responseData.data.currentUser.userGroups.map((groupe) => {
            return {
              name: groupe.group.name,
              id: groupe.group.id,
              balance: groupe.user.balance,
              groupImageUrl: groupe.group.groupImageUrl
            };
          });
        }
      } catch (error) {
        console.error('Erreur:', error);
      }
      this.activeGroup = this.groups[0];

    },

  },
};
</script>

<style scoped>

.activeGroup {
  background-color: var(--second-background-color);
  border: none;
}

.groupHeader {
  background-color: var(--third-background-color);
}

.col-3 {
  background-color: var(--main-background-color);
  border-right: 1px solid var(--second-background-color);
}

.nav-link.active {
  background-color: var(--third-background-color) !important;
  color: white !important;
  border-bottom: 1px solid var(--third-background-color) !important;
}
</style>
