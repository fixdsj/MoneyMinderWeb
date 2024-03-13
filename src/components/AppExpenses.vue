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
        <label class="form-label">Utilisateurs concernés:</label>
        <input type="text" class="form-control" id="weightedinput" placeholder="Ajouter un utilisateur..."
               v-model="texttosuggest" @input="suggestUsers">

        <ul class="list-group">
          <li class="list-group-item d-flex justify-content-between align-items-center" v-for="user in suggestedUsers"
              :key="user.id" @click="selectUser(user)">
            {{ user.userName }}
            <button class="btn btn-primary">+</button>
          </li>
        </ul>

        <ul class="list-group mt-2">
          <li class="list-group-item d-flex justify-content-between align-items-center" v-for="user in selectedsUsers"
              :key="user.id">
            {{ user.userName }}
            <label for="montant" class="form-label">Poids:</label>
            <input type="number" class="form-control" v-bind:min="0" step="0.1">
            <button class="btn btn-danger" @click="removeUserFromSelected(user)"><i class="bi bi-trash"></i></button>
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
        groupeusers: {},
      },
      justificatif: null,


      usersInGroup: [],
      texttosuggest: '',
      selectedsUsers: [],
      suggestedUsers: [],
    };
  },
  methods: {
    submitDepense() {
      console.log('Créer une dépense avec justificatif:', this.justificatif);
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
      this.selectedsUsers.push(user);
      this.suggestedUsers = [];
      this.texttosuggest = '';
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
      } catch (error) {
        console.error('Erreur lors de la récupération des membres du groupe', error);
      }

    },

    async suggestUsers() {
      if (this.texttosuggest === '') {
        this.suggestedUsers = [];
      }
      if (this.texttosuggest.length > 1) {
        console.log('Recherche de l\'utilisateur:', this.texttosuggest);
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
          this.suggestedUsers = responseData.data.users;
        }
        console.log('Utilisateurs suggérés:', this.suggestedUsers);
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
