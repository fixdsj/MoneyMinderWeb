<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title text-md-center">Mes groupes</h4>
            <div class="d-flex justify-content-center mt-3 mb-3">
              <!-- Nouveau groupe -->
              <button aria-controls="newGroupForm" aria-expanded="false" class="btn btn-primary"
                      data-bs-target="#newGroupForm"
                      data-bs-toggle="collapse" type="button">
                Nouveau groupe
              </button>
            </div>
            <div id="newGroupForm" class="collapse mt-3 mb-3">
              <form @submit.prevent="createGroup">
                <div class="mb-3">
                  <label class="form-label" for="nom">Nom</label>
                  <input id="nom" v-model="nomGroupe" class="form-control" placeholder="Nom" type="text"/>
                </div>
                <div class="mb-3">
                  <label class="form-label" for="description">Description</label>
                  <input id="description" v-model="descriptionGroupe" class="form-control" placeholder="Description"
                         type="text"/>
                </div>
                <button class="btn btn-primary" type="submit">Créer</button>
              </form>
            </div>

            <!-- Inviter un user -->
            <div class="d-flex justify-content-center mt-3 mb-3">
              <button aria-controls="inviteUserForm" aria-expanded="false" class="btn btn-primary"
                      data-bs-target="#inviteUserForm"
                      data-bs-toggle="collapse" type="button">
                Inviter un utilisateur
              </button>
            </div>

            <div id="inviteUserForm" class="collapse mt-3 mb-3">
              <form @submit.prevent="inviteToGroup">
                <div class="mb-3">
                  <label class="form-label" for="pseudo">Nom d'utilisateur</label>
                  <input id="pseudo" v-model="selectedUser.userName" class="form-control"
                         placeholder="Nom d'utilisateur" required
                         type="text" @input="suggestUsers"/>
                  <ul class="list-group">
                    <button v-for="user in suggestedUsers" :key="user.id" class="list-group-item list-group-item-action"
                            @click="selectUser(user)">
                      {{ user.userName }}
                    </button>
                    <li v-if="suggestedUsers.length === 0 && selectedUser.userName !== ''" class="list-group-item">
                      <a class="btn fst-italic" role="button">Aucun utilisateur trouvé</a>
                    </li>

                  </ul>
                </div>
                <div class="mb-3">
                  <label class="form-label" for="selectGroup">Groupe</label>
                  <select id="selectGroup" v-model="selectedGroup" class="form-select" required>
                    <option v-for="groupe in groupsJoined" :key="groupe.id" :value="groupe.id">{{ groupe.name }}
                    </option>
                  </select>
                </div>

                <button class="btn btn-primary" type="submit">Inviter</button>
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
                <a class="btn fst-italic" role="button">Aucun groupe</a>
              </li>
            </ul>
            <h4 class="card-title mt-3 text-md-center">Groupes rejoints</h4>
            <ul class="list-group">
              <li v-for="groupe in groupsJoined" :key="groupe.id"
                  class="list-group-item d-flex justify-content-between align-items-center">
                {{ groupe.name }}
              </li>
              <li v-if="groupsJoined.length === 0" class="list-group-item">
                <a class="btn fst-italic" role="button">Aucun groupe</a>
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
                <button class="btn btn-primary" @click="acceptInvitation(invitation.group.id)">Accepter</button>
                <button class="btn btn-danger">Refuser</button>
              </li>
              <li v-if="invitations.length === 0" class="list-group">
                <a class="btn fst-italic" role="button">Aucune invitation</a>
              </li>
            </ul>
            <h4 class="card-title text-md-center">Mes informations</h4>
            <form class="form" @submit.prevent="updateCompte">
              <div class="mb-3">
                <label class="form-label" for="pseudo">Nom d'utilisateur:</label>
                <input id="prenom" v-model="utilisateur.username" class="form-control" type="text"/>
              </div>
              <div class="mb-3">
                <label class="form-label" for="email">Email:</label>
                <input id="email" v-model="utilisateur.email" class="form-control" readonly type="email"/>
              </div>
              <div class="d-flex justify-content-center mt-3">
                <button class="btn btn-primary " type="submit">Mettre à jour</button>
              </div>
            </form>
            <div class="d-flex justify-content-center mt-3">
              <button class="btn btn-danger" data-bs-target="#deleteAccountModal" data-bs-toggle="modal" type="button">
                Supprimer mon compte
              </button>

              <div id="deleteAccountModal" aria-hidden="true" aria-labelledby="deleteAccountModalLabel"
                   class="modal fade"
                   tabindex="-1">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 id="deleteAccountModalLabel" class="modal-title">Suppression du compte</h5>
                      <button aria-label="Close" class="btn-close" data-bs-dismiss="modal" type="button"></button>
                    </div>
                    <div class="modal-body">
                      Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.
                    </div>
                    <div class="modal-footer">
                      <button class="btn btn-secondary" data-bs-dismiss="modal" type="button">Annuler</button>
                      <button class="btn btn-danger" type="button" @click="deleteAccount">Supprimer</button>
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
import {isLogged} from "@/main";
import axios from "axios";

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
      try {
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
      } catch (error) {
        console.error('Erreur:', error);
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
      if (this.selectedUser.userName.length > 1) {
        try {
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
        } catch (error) {
          console.error('Erreur:', error);
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
      try {
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
        }
        if (responseDataUser.errors) {
          console.log("erreur" + responseDataUser.errors.message);
        }

      } catch (error) {
        console.error('Erreur:', error);
      }

      try {
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

      } catch (error) {
        console.error('Erreur:', error);
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
      try {
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
      } catch (error) {
        console.error('Erreur:', error);
      }
    },

    async acceptInvitation(groupId) {
      try {
        const axios = require('axios');
        const response = await axios.post('http://localhost:3000/graphql', {
          query: `mutation{joinGroup(userGroupInsertInput: {groupId:"${groupId}"}){joinedAt}}`
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
          },
        });
        const responseData = response.data;
        if (responseData.data.joinGroup) {
          var toastLive = document.getElementById('liveToast')
          this.alertMessage = `Invitation acceptée`;
          toastLive.classList.add('show')
          console.log('Invitation acceptée:', responseData.data.joinGroup);
          await this.fetchCurrentUserDetails();
        }
        console.log('Réponse pour l invitation:', responseData);
      } catch (error) {
        console.error('Erreur:', error);
      }

    }
  },
};
</script>

<style scoped>


</style>