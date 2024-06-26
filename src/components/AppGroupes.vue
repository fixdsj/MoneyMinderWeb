<template>
  <div v-if="isLoading" class="text-center mt-2">
    <div class="spinner-border" role="status" style="width: 3rem; height: 3rem;">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <div v-else class="text-bg-secondary">
    <div v-if="groups.length > 0 && activeGroup.id" class="tab-content row">
      <div class="col-3">
        <div class="list-group">
          <div class="list-group-item text-center">Groups</div>
          <div v-for="group in groups" :key="group.id" :class="{'activeGroup': group.name === activeGroup.name}"
               class="list-group-item text-center" type="button" @click="setActiveGroup(group)">
            {{ group.name }}
          </div>
          <div class="list-group-item my-auto text-center" role="button"
               @click="$router.push('/account')">Create a group
          </div>
          <div v-if="groups.length === 0" class="list-group-item fst-italic" type="button">
            You don't have any group yet.
          </div>
        </div>
        <img alt="" class="img-fluid" height="400" src="../assets/illustrations/userwithphone.png" width="400">
      </div>

      <div class="col-9">
        <ul class="nav nav-tabs" role="tablist">
          <li class="nav-item" role="presentation">
            <button id="expense-tab" aria-controls="expense-tab-pane" aria-selected="true" class="nav-link active"
                    data-bs-target="#expense-tab-pane" data-bs-toggle="tab" role="tab" type="button"
                    @click="setActiveTab('expense-tab-pane')">Expenses
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button id="refund-tab" aria-controls="refund-tab-pane" aria-selected="false" class="nav-link"
                    data-bs-target="#refund-tab-pane" data-bs-toggle="tab" role="tab" type="button"
                    @click="setActiveTab('refund-tab-pane')">Refunds
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button id="lasttransaction-tab" aria-controls="lasttransaction-tab-pane" aria-selected="false"
                    class="nav-link" data-bs-target="#lasttransaction-tab-pane" data-bs-toggle="tab"
                    role="tab" type="button" @click="setActiveTab('lasttransaction-tab-pane')">Last transactions
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button id="groupedetail-tab" aria-controls="groupedetail-tab-pane" aria-selected="false" class="nav-link"
                    data-bs-target="#groupedetail-tab-pane" data-bs-toggle="tab" role="tab" type="button"
                    @click="setActiveTab('groupedetail-tab-pane')">Group details
            </button>
          </li>

        </ul>
        <div class="text-center">
          <div class="alert alert-light groupHeader">
            <h5 class="mb-0">{{ activeGroup.name }}</h5>
            <div>{{ activeTab }}</div>
          </div>
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
    <div v-else class="text-center pt-4">
      <div class="alert alert-info">
        You don't have any group yet. Create one now.
      </div>
      <button class="btn btn-primary mt-3" @click="$router.push('/account')">Create a group</button>
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
      isLoading: false,
      groups: [],
      activeGroup: [],
      activeTab: 'Créer une dépense'
    };
  },
  mounted() {
    this.fetchCurrentUserGroups();
  },

  methods: {
    setActiveGroup(group) {
      this.activeGroup = group;
    },
    setActiveTab(tab) {

      if (tab === 'expense-tab-pane') {
        this.activeTab = 'Create an expense';
      }
      if (tab === 'refund-tab-pane') {
        this.activeTab = 'Create a refund';
      }
      if (tab === 'lasttransaction-tab-pane') {
        this.activeTab = 'See last transactions';
      }
      if (tab === 'groupedetail-tab-pane') {
        this.activeTab = 'See group details';
      }
    },
    async fetchCurrentUserGroups() {
      try {
        this.isLoading = true;
        const axios = require('axios');
        const response = await axios.post('${process.env.VUE_APP_API_URL}', {
          query: `{currentUser{userGroups{group{name,id,groupImageUrl}}}}`
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
              groupImageUrl: groupe.group.groupImageUrl
            };
          });

        }
        this.isLoading = false;
      } catch (error) {
        console.error('Erreur:', error);
      }
      if (this.groups.length > 0) {
        this.activeGroup = this.groups[0];
      }

    },

  },
};
</script>

<style scoped>

.activeGroup {
  background-color: var(--third-background-color) !important;
  border: none;
}

.groupHeader {
  background-color: var(--third-background-color);
  border-top: 1px solid var(--second-background-color);
}

.col-3 {
  background-color: var(--main-background-color);
  border-right: 1px solid var(--second-background-color);
}

.nav-link.active {
  background-color: var(--third-background-color) !important;
  color: white !important;
}

.nav-link {
  color: white !important;
}

.text-bg-secondary {
  background-color: var(--main-background-color) !important;
}

.list-group-item {
  background-color: var(--second-background-color);
}
</style>
