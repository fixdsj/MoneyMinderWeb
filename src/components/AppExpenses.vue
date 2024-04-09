<template>
  <div class="col-md-10 mx-auto col-lg-5 app-depenses">
    <h3 class="text-center mb-4">Créer une dépense</h3>
    <form v-if="currentStep === 1" @submit.prevent="submitDepense">
      <div class="progress" style="height: 5px;">
        <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="25" class="progress-bar" role="progressbar"
             style="width: 50%;"></div>
      </div>
      <!-- Première étape -->
      <div class="mb-3">
        <label class="form-label" for="description">Titre:</label>
        <input id="description" v-model="depense.description" class="form-control" type="text"/>
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
          <button v-else class="btn btn-link" type="button" @click="unselectAllUsers">Tout supprimer</button>
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

      <div class="mb-3 text-center">
        <button class="btn btn-primary" type="button" @click="submitDepense">Créer la dépense</button>
      </div>
    </form>

    <form v-if="currentStep === 2" @submit.prevent="submitJustificatif">
      <div class="progress" style="height: 5px;">
        <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="25" class="progress-bar" role="progressbar"
             style="width: 100%;"></div>
      </div>
      <!-- Deuxième étape -->
      <div class="mb-3">
        <label class="form-label" for="proof">Justificatif (facultatif):</label>
        <input id="proof" class="form-control" type="file" @change="handleFileChange"/>
      </div>

      <div class="mb-3 text-center">
        <button class="btn btn-primary" type="submit">Envoyer le justificatif</button>
      </div>
    </form>
  </div>


  <!-- Notification -->
  <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
    <div id="liveToast" aria-atomic="true" aria-live="assertive" class="toast" role="alert">
      <div class="toast-header">
        <strong class="me-auto">Money Minder</strong>
        <small>à l'instant</small>
        <button aria-label="Close" class="btn-close" data-bs-dismiss="toast" type="button"></button>
      </div>
      <div class="toast-body">
        {{ alertMessage }}
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'AppExpenses',
  props: {
    activeGroup: String,
  },
  data() {
    return {
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

      groupId: null,


      //Preview expense
      expensesPreview: [],

      //Justificatif

      expenseId: null,


    };
  },
  methods: {
    async submitDepense() {
      try {
        this.weightquery = this.selectedsUsers.map((user) => {
          return `{key:"${user.id}",value:${user.weight}}`;
        }).join(',');
        const axios = require('axios');
        const response = await axios.post('${process.env.VUE_APP_API_URL', {
          query: `mutation {
  addUserExpense(expenseInsertInput: {amount:${this.depense.montant}, description:"${this.depense.description}", groupId:"${this.groupId}",usersWithAmount:
  [${this.weightquery}]
  }){
    paidAt,
    expense{amount,description,id},
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
          this.alertMessage = 'Dépense créée avec succès';
          this.currentStep++;
          this.expenseId = responseData.data.addUserExpense.expense.id;
        }

      } catch (error) {
        console.error('Erreur lors de la création de la dépense', error);
      }

    },
    submitJustificatif() {
      console.log('Créer une dépense avec justificatif:', this.justificatif);
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
      console.log('usersInGroup:', this.usersInGroup);
    },
    unselectAllUsers() {
      this.selectedsUsers = [];
    },
    removeUserFromSelected(user) {
      this.selectedsUsers = this.selectedsUsers.filter((selectedUser) => selectedUser !== user);
    },

    async fetchMembersGroup() {
      try {
        console.log('activeGroup:', this.activeGroup);
        const axios = require('axios');
        const response = await axios.post('${process.env.VUE_APP_API_URL}', {
          query: `query {
    groups(where: { name: { contains: "${this.activeGroup}" } }) {
      userGroups{user{userName, id}}
      id
    }
  }`
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
          },
        });
        const responseData = await response.data;
        console.log('responseData:', responseData);
        if (responseData.errors) {
          console.log('Erreur : ' + responseData.errors[0].message);
        }
        if (responseData.data.groups) {
          this.usersInGroup = responseData.data.groups[0].userGroups.map((user) => {
            return {
              userName: user.user.userName,
              id: user.user.id,
            };
          });
          this.groupId = responseData.data.groups[0].id;
          console.log('groupId:', this.groupId);
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
        console.log('selectedsUsers:', this.selectedsUsers)
        this.weightquery = this.selectedsUsers.map((user) => {
          if (user.weight !== undefined) {
            return `{key:"${user.id}",value:${user.weight}}`;
          } else {
            return `{key:"${user.id}"}`;
          }
        }).join(',');
        const axios = require('axios');
        console.log('userAmountsList:', this.weightquery);

        const response = await axios.post('${process.env.VUE_APP_API_URL}', {
          query: `query{previsualizeUserExpenses(
  expensePrevisualizationInput:{
    amount:${this.depense.montant},
    description:"uhe",
  groupId:"${this.groupId}",
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
        console.log('responseData:', responseData);
        if (responseData.data.previsualizeUserExpenses) {
          console.log('previsualizeUserExpenses:', responseData.data.previsualizeUserExpenses);
          this.expensesPreview = responseData.data.previsualizeUserExpenses;
        }
      } catch (error) {
        console.error('Erreur lors de la prévisualisation de la dépense', error);
      }
    },

    getUserPreviewAmount(userId) {
      const userPreview = this.expensesPreview.find((user) => user.key === userId);
      if (userPreview) {
        console.log('userPreview:', userPreview);
        return userPreview.value;
      }
      return 0;


    },
  },
  mounted() {
    this.fetchMembersGroup();
  },

};
</script>

<style scoped>


</style>

