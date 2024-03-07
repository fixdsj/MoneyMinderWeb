<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title">Mes groupes</h2>
            <ul class="list-group">
              <li v-for="groupe in groupes" :key="groupe.id"
                  class="list-group-item d-flex justify-content-between align-items-center">
                {{ groupe.nom }}
                <button style="border: none; background-color: transparent;" @click="deleteGroupe"><i
                    class="bi bi-trash "></i></button>
              </li>
            </ul>
            <div class="d-flex justify-content-center mt-3">
              <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#newGroupForm"
                      aria-expanded="false" aria-controls="newGroupForm">
                Nouveau groupe
              </button>
            </div>
            <div class="collapse mt-3" id="newGroupForm">
              <form @submit.prevent="createGroupe">
                <div class="mb-3">
                  <label for="nom" class="form-label">Nom</label>
                  <input type="text" class="form-control" id="nom" v-model="nomGroupe" placeholder="Nom"/>
                </div>
                <div class="mb-3">
                  <label for="description" class="form-label">Description</label>
                  <input type="text" class="form-control" id="description" v-model="descriptionGroupe"
                         placeholder="Description"/>
                </div>
                <button type="submit" class="btn btn-primary">Créer</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title">Mes informations</h2>
            <form @submit.prevent="updateCompte" class="form">
              <div class="mb-3">
                <label for="pseudo" class="form-label">Nom d'utilisateur:</label>
                <input type="text" id="prenom" v-model="utilisateur.username" class="form-control"/>
              </div>
              <div class="mb-3">
                <label for="nom" class="form-label">Nom:</label>
                <input type="text" id="nom" v-model="utilisateur.nom" class="form-control"/>
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email:</label>
                <input type="email" id="email" v-model="utilisateur.email" class="form-control"/>
              </div>
              <button class="btn btn-primary" type="submit">Mettre à jour</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
    <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <strong class="me-auto">Money Minder</strong>
        <small>à l'instant</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body" style="color: #3CB371">
        {{ alertMessage }}
      </div>
    </div>
  </div>
</template>


<script>

export default {
  name: 'AppAccount',
  mounted() {
    this.fetchCurrentUserDetails();

  },
  data() {
    return {
      utilisateur: {
        username: '',
        email: '',
      },
      groupes: [
        {id: 1, nom: 'Groupe A', description: 'Description du Groupe A'},
        {id: 2, nom: 'Groupe B', description: 'Description du Groupe B'},
        {id: 3, nom: 'Groupe C', description: 'Description du Groupe C'},
        {id: 4, nom: 'Groupe D', description: 'Description du Groupe D'},
      ],
      nomGroupe: '',
      descriptionGroupe: '',
      alertMessage: '',

    };
  },
  methods: {
    updateCompte() {
      console.log('Informations mises à jour:', this.utilisateur);
    },

    async createGroupe() {
      var toastLiveExample = document.getElementById('liveToast')
      const axios = require('axios');
      const response = await axios.post('http://localhost:3000/graphql', {
        query: `mutation{
    createGroup(groupInsertInput:  {
        name:"${this.nomGroupe}",
        description:"${this.descriptionGroupe}"

    }){
      name,
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
      if (responseData.data) {
        console.log('Groupe créé:', responseData.data.createGroup);
        this.alertMessage = `Groupe "${this.nomGroupe}" créé avec succès !`;
        toastLiveExample.classList.add('show')
      }
    },

    async fetchCurrentUserDetails() {
      const axios = require('axios');
      const response = await axios.post('http://localhost:3000/graphql', {
        query: `{currentUser{userName, email}}`
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          "Accept": "application/json",
        },
      });
      const responseData = response.data;
      console.log('Réponse:', responseData);
      if (responseData.data) {
        this.utilisateur.username = responseData.data.currentUser[0].userName;
        this.utilisateur.email = responseData.data.currentUser[0].email;
      }
      if (responseData.errors) {
        console.log("erreur" + responseData.errors.message);
      }
      console.log('Utilisateur actuel:', this.utilisateur.prenom);
    },

    async deleteGroupe() {
      console.log('Groupe supprimé');
    }

  },

};
</script>

<style scoped>


</style>