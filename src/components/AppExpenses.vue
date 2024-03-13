<template>
  <div class="col-md-10 mx-auto col-lg-5 app-depenses">
    <h3 class="text-center mb-4">Créer une dépense</h3>
    <form @submit.prevent="submitDepense" v-if="currentStep === 1">
      <!-- Première étape -->
      <div class="mb-3">
        <label for="description" class="form-label">Intitulé:</label>
        <input type="text" id="description" class="form-control" v-model="depense.description"/>
      </div>

      <div class="mb-3">
        <label for="montant" class="form-label">Montant:</label>
        <div class="input-group">
          <span class="input-group-text">€</span>
          <input type="number" class="form-control" id="montant" v-model="depense.montant" v-bind:min="0" step="0.1">
        </div>

      </div>

      <div class="mb-3">
        <div class="d-flex justify-content-between ">
          <label class="form-label">Utilisateurs concernés:</label>
          <button type="button" class="btn btn-link" @click="selectAllUsers">Tout sélectionner</button>
        </div>
        <input type="text" class="form-control" id="weightedinput" placeholder="Ajouter un utilisateur..."
               v-model="texttosuggest" @input="suggestUsers">

        <ul class="list-group">
          <li class="list-group-item d-flex justify-content-between align-items-center" v-for="user in suggestedUsers"
              :key="user.id" @click="selectUser(user)">
            {{ user.userName }}
            <button class="btn btn-primary">+</button>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center"
              v-if="suggestedUsers.length === 0 && texttosuggest.length > 1">
            Aucun utilisateur trouvé
          </li>
        </ul>

        <ul class="list-group mt-2">
          <li class="list-group-item d-flex justify-content-center align-items-center p-0"
              v-for="user in selectedsUsers"
              :key="user.id">
            <span class="input-group-text rounded-0">{{ user.userName }}</span>
            <input type="number" class="form-control input-group rounded-0" v-bind:min="0" step="0.1"
                   placeholder="Poids" v-model="user.weight">
            <button class="btn btn-danger rounded-0" @click="removeUserFromSelected(user)"><i class="bi bi-trash"></i>
            </button>
          </li>
        </ul>
      </div>
      <div class="mb-3">
        <label for="categorie" class="form-label">Catégorie:</label>
        <select id="categorie" class="form-select">
          <option value="alimentation">Alimentation</option>
          <option value="sorties">Sorties</option>
          <option value="logement">Logement</option>
          <option value="transport">Transport</option>
          <option value="divers">Divers</option>
        </select>
      </div>

      <div class="mb-3 text-center">
        <button type="button" class="btn btn-primary" @click="submitDepense">Créer la dépense</button>
      </div>
    </form>

    <form @submit.prevent="submitJustificatif" v-if="currentStep === 2">
      <!-- Deuxième étape -->
      <div class="mb-3">
        <label for="proof" class="form-label">Justificatif (facultatif):</label>
        <input type="file" class="form-control" id="proof" @change="handleFileChange"/>
      </div>

      <div class="mb-3 text-center">
        <button type="submit" class="btn btn-primary">Envoyer le justificatif</button>
      </div>
    </form>
  </div>


  <!-- Notification -->
  <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
    <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <strong class="me-auto">Money Minder</strong>
        <small>à l'instant</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
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


    };
  },
  methods: {
    async submitDepense() {
      console.log('group id:', this.groupId);
      this.weightquery = this.selectedsUsers.map((user) => {
        return `{key:"${user.id}",value:${user.weight}}`;
      }).join(',');
      const axios = require('axios');
      const response = await axios.post('http://localhost:3000/graphql', {
        query: `mutation {
  addUserExpenses(expenseInsertInput: {amount:${this.depense.montant}, description:"${this.depense.description}", groupId:"${this.groupId}",weightedUsers:
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
      console.log('Réponse:', responseData);
      if (responseData.errors) {
        console.log('Erreur : ' + responseData.errors[0].message);
      }
      if (responseData.data) {
        this.alertMessage = 'Dépense créée avec succès';
      }

      this.currentStep++;
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
    },
    removeUserFromSelected(user) {
      this.selectedsUsers = this.selectedsUsers.filter((selectedUser) => selectedUser !== user);
    },

    async fetchMembersGroup() {
      try {
        const axios = require('axios');
        const response = await axios.post('http://localhost:3000/graphql', {
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
        const responseData = response.data;
        if (responseData.errors) {
          console.log('Erreur : ' + responseData.errors[0].message);
        }
        if (responseData.data.groups[0]) {
          this.usersInGroup = responseData.data.groups[0].userGroups.map((user) => {
            return {
              userName: user.user.userName,
              id: user.user.id,
            };
          });
        }
        if (responseData.data.groups[0].id) {
          console.log('group id:', responseData.data.groups[0].id);
          this.groupId = responseData.data.groups[0].id;
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
        const axios = require('axios');
        const response = await axios.post('http://localhost:3000/graphql', {
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
      }
    },

  },
  mounted() {
    this.fetchMembersGroup();
  },

};
</script>

<style scoped>


</style>
