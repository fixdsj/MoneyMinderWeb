<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title text-md-center">Mes groupes</h4>
            <div class="d-flex justify-content-center mt-3 mb-3">
              <!-- Nouveau groupe -->
              <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#newGroupForm"
                      aria-expanded="false" aria-controls="newGroupForm">
                Nouveau groupe
              </button>
            </div>
            <div class="collapse mt-3 mb-3" id="newGroupForm">
              <form @submit.prevent="createGroup">
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

            <!-- Inviter un user -->
            <div class="d-flex justify-content-center mt-3 mb-3">
              <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#inviteUserForm"
                      aria-expanded="false" aria-controls="inviteUserForm">
                Inviter un utilisateur
              </button>
            </div>

            <div class="collapse mt-3 mb-3" id="inviteUserForm">
              <form @submit.prevent="inviteToGroup">
                <div class="mb-3">
                  <label for="pseudo" class="form-label">Nom d'utilisateur</label>
                  <input required type="text" class="form-control" id="pseudo" placeholder="Nom d'utilisateur"
                         v-model="selectedUser.userName" @input="suggestUsers()"/>
                  <ul class="list-group">
                    <button v-for="user in suggestedUsers" :key="user.id" class="list-group-item list-group-item-action"
                            @click="selectUser(user)">
                      {{ user.userName }}
                    </button>
                  </ul>
                </div>
                <div class="mb-3">
                  <label for="selectGroup" class="form-label">Groupe</label>
                  <select class="form-select" id="selectGroup" v-model="selectedGroup" required>
                    <option v-for="groupe in groupsJoined" :key="groupe.id" :value="groupe.id">{{ groupe.name }}
                    </option>
                  </select>
                </div>

                <button type="submit" class="btn btn-primary">Inviter</button>
              </form>

            </div>

            <ul class="list-group">
              <li v-for="groupe in groupsOwned" :key="groupe.id"
                  class="list-group-item d-flex justify-content-between align-items-center">
                {{ groupe }}
                <button style="border: none; background-color: transparent;" @click="deleteGroupe"><i
                    class="bi bi-trash "></i></button>
              </li>
              <li v-if="groupsOwned.length === 0" class="list-group-item">
                <a role="button" class="btn fst-italic">Aucun groupe</a>
              </li>
            </ul>
            <h4 class="card-title mt-3 text-md-center">Groupes rejoints</h4>
            <ul class="list-group">
              <li v-for="groupe in groupsJoined" :key="groupe.id"
                  class="list-group-item d-flex justify-content-between align-items-center">
                {{ groupe.name }}
              </li>
              <li v-if="groupsJoined.length === 0" class="list-group-item">
                <a role="button" class="btn fst-italic">Aucun groupe</a>
              </li>
            </ul>

          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title text-md-center">Invitations</h5>
            <ul class="list-group">
              <li v-for="invitation in invitations" :key="invitation.id"
                  class="list-group-item d-flex justify-content-between align-items-center">
                {{ invitation.group.name }}
                <button class="btn btn-primary">Accepter</button>
                <button class="btn btn-danger">Refuser</button>
              </li>
              <li v-if="invitations.length === 0" class="list-group">
                <a role="button" class="btn fst-italic">Aucune invitation</a>
              </li>
              <!--              <li class="list-group-item d-flex justify-content-between align-items-center">
                              Groupe 1
                              <button class="btn btn-primary">Accepter</button>
                              <button class="btn btn-danger">Refuser</button>
                            </li>-->

            </ul>
            <h4 class="card-title text-md-center">Mes informations</h4>
            <form @submit.prevent="updateCompte" class="form">
              <div class="mb-3">
                <label for="pseudo" class="form-label">Nom d'utilisateur:</label>
                <input type="text" id="prenom" v-model="utilisateur.username" class="form-control"/>
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email:</label>
                <input type="email" id="email" v-model="utilisateur.email" class="form-control" readonly/>
              </div>
              <div class="d-flex justify-content-center mt-3">
                <button class="btn btn-primary " type="submit">Mettre à jour</button>
              </div>
            </form>
            <div class="d-flex justify-content-center mt-3">
              <button class="btn btn-danger" type="button" data-bs-toggle="modal" data-bs-target="#deleteAccountModal">
                Supprimer mon compte
              </button>

              <div class="modal fade" id="deleteAccountModal" tabindex="-1" aria-labelledby="deleteAccountModalLabel"
                   aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="deleteAccountModalLabel">Suppression du compte</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                      <button type="button" class="btn btn-danger" @click="deleteAccount">Supprimer</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
      <div class="toast-body">
        {{ alertMessage }}
      </div>
    </div>
  </div>
</template>


<script>
import {isLogged} from "@/main";

export default {
  name: 'AppAccount',
  mounted() {
    this.fetchCurrentUserDetails();

  },
  data() {
    return {
      //Utilisateur
      utilisateur: {
        username: '',
        email: '',
      },
      invitations: [],
      groupsOwned: [],
      groupsJoined: [],


      //Nouveau groupe
      nomGroupe: '',
      descriptionGroupe: '',

      //Notification
      alertMessage: '',

      //Inviter a un groupe
      selectedGroup: [],
      suggestedUsers: [],
      selectedUser: {
        userName: '', id: ''
      }

    };
  },
  methods: {
    updateCompte() {
      console.log('Informations mises à jour:', this.utilisateur);
    },


    async inviteToGroup() {
      console.log('Invitation envoyée à:', this.selectedUser.userName, 'ou son idUser est :', this.selectedUser.id, 'pour le groupe:', this.selectedGroup);
      const axios = require('axios');
      const response = await axios.post('http://localhost:3000/graphql', {
        query: `mutation{inviteUser(invitationInsertDto:{groupId:"${this.selectedGroup}", userId:"${this.selectedUser.id}"}){invitedAt,group{name}}}`
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          "Accept": "application/json",
        },
      });
      const responseData = response.data;
      if (responseData.data.inviteUser) {
        console.log('Invitation envoyée:', responseData.data.inviteUser);
        this.alertMessage = `Invitation envoyée à ${this.selectedUser.userName} pour le groupe ${responseData.data.inviteUser.group.name}`;
        var toastLive = document.getElementById('liveToast')
        toastLive.classList.add('show')
        console.log('data', responseData.data);
        this.selectedUser = {
          userName: '', id: ''
        };
        this.selectedGroup = [];
      }

    },

    selectUser(user) {
      this.selectedUser = user;
      this.suggestedUsers = [];
    },

    async suggestUsers() {
      if (this.selectedUser.userName === '') {
        this.suggestedUsers = [];
      }
      if (this.selectedUser.userName) {
        console.log('Recherche de l\'utilisateur:', this.selectedUser.userName);
        const axios = require('axios');
        const response = await axios.post('http://localhost:3000/graphql', {
          query: `query {
    users(where: { userName: { startsWith: "${this.selectedUser.userName}" } }) {
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
      }
    },

    async createGroup() {
      let toastLive = document.getElementById('liveToast')
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
        this.alertMessage = `Groupe "${this.nomGroupe}" créé avec succès !`;
        toastLive.classList.add('show')
        await this.fetchCurrentUserDetails();
        this.nomGroupe = '';
        this.descriptionGroupe = '';

      }
    },

    async fetchCurrentUserDetails() {
      const axios = require('axios');
      const responseUser = await axios.post('http://localhost:3000/graphql', {
        query: `{currentUser{userName, email, invitations{group{name,id}}}}`
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          "Accept": "application/json",
        },
      });
      const responseDataUser = responseUser.data;
      if (responseDataUser.data) {
        this.utilisateur.username = responseDataUser.data.currentUser[0].userName;
        this.utilisateur.email = responseDataUser.data.currentUser[0].email;
        this.invitations = responseDataUser.data.currentUser[0].invitations;
        console.log('Invitations:', this.invitations);
      }
      if (responseDataUser.errors) {
        console.log("erreur" + responseDataUser.errors.message);
      }


      const responseUserGroups = await axios.post('http://localhost:3000/graphql', {
        query: `{currentUser{userGroups{group{name,id}},ownedGroups{name}}}`
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          "Accept": "application/json",
        },
      });
      const responseDataUserGroups = responseUserGroups.data;
      if (responseDataUserGroups.data) {

        if (responseDataUserGroups.data.currentUser) {

          this.groupsOwned = responseDataUserGroups.data.currentUser[0].ownedGroups.map(group => group.name);
          this.groupsJoined = responseDataUserGroups.data.currentUser[0].userGroups.map(userGroup => userGroup.group);

        }
      }
      if (responseDataUserGroups.errors) {
        console.log("erreur" + responseDataUserGroups.errors.message);
      }
    },

    async deleteGroupe() {
      if (window.confirm("Voulez-vous vraiment supprimer ce groupe ?")) {
        var toastLive = document.getElementById('liveToast')
        this.alertMessage = 'Groupe supprimé';
        toastLive.classList.add('show')


        console.log('Groupe supprimé');
      }

    },

    async deleteAccount() {
      const axios = require('axios');
      const response = await axios.post('http://localhost:3000/graphql', {
        query: `mutation{deleteSelf}`
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          "Accept": "application/json",
        },
      });
      const responseData = response.data;
      if (responseData.data.deleteSelf) {
        var toastLive = document.getElementById('liveToast')
        this.alertMessage = 'Compte supprimé';
        toastLive.classList.add('show')
        isLogged.value = false;
        this.$router.push('/login');

      }
      if (responseData.errors) {
        console.log("erreur" + responseData.errors.message);
      }
    }
  },

};
</script>

<style scoped>


</style>