<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6">
        <div>
          <h4 class="card-title text-md-center">My groups</h4>
          <div class="d-flex justify-content-center mt-3 mb-3">
            <!-- Nouveau groupe -->
            <button aria-controls="newGroupForm" aria-expanded="false" class="btn btn-primary"
                    data-bs-target="#newGroupForm"
                    data-bs-toggle="collapse" type="button">
              New group
            </button>
          </div>
          <div id="newGroupForm" class="collapse mt-3 mb-3">
            <form @submit.prevent="createGroup">
              <div class="mb-3 form-floating">
                <input id="nom" v-model="nomGroupe" class="form-control" placeholder="Name" type="text"/>
                <label for="nom">Name</label>
              </div>
              <div class="mb-3 form-floating">

                <input id="description" v-model="descriptionGroupe" class="form-control" placeholder="Description"
                       type="text"/>
                <label for="description">Description</label>
              </div>
              <div class="text-center">
                <button class="btn btn-primary" type="submit">Create</button>
              </div>
            </form>
          </div>

          <!-- Inviter un user -->
          <div class="d-flex justify-content-center mt-3 mb-3">
            <button aria-controls="inviteUserForm" aria-expanded="false" class="btn btn-primary"
                    data-bs-target="#inviteUserForm"
                    data-bs-toggle="collapse" type="button">
              Invite user
            </button>
          </div>
          <div id="inviteUserForm" class="collapse mt-3 mb-3">
            <form @submit.prevent="inviteToGroup">
              <div class="mb-3 form-floating">
                <input id="pseudo" v-model="selectedUser.userName" class="form-control"
                       placeholder="Nom d'utilisateur" required
                       type="text" @input="suggestUsers"/>
                <label for="pseudo">Username</label>
                <ul class="list-group list-unstyled">
                  <li v-for="user in suggestedUsers" :key="user.id">
                    <button class="list-group-item list-group-item-action"
                            @click="selectUser(user)">
                      {{ user.userName }}
                    </button>
                  </li>

                  <li v-if="suggestedUsers.length === 0 && selectedUser.userName.length > 2 && !hasSelectedUser"
                      class="list-group-item fst-italic">
                    Aucun utilisateur trouvé
                  </li>

                </ul>
              </div>
              <div class="form-floating mb-3">
                <select id="selectGroup" v-model="selectedGroup" class="form-select" required>
                  <option disabled selected value="">Choisir un groupe</option>
                  <option v-for="groupe in groupsJoined" :key="groupe.id" :value="groupe.id">{{ groupe.name }}</option>
                </select>
                <label for="selectGroup">Groupe</label>

              </div>

              <div class="text-center">
                <button class="btn btn-primary" type="submit">Inviter</button>
              </div>
            </form>

          </div>

          <ul class="list-group">
            <li v-for="groupe in groupsOwned" :key="groupe.id"
                class="list-group-item d-flex justify-content-between align-items-center">
              <i class="bi bi-award-fill"></i>
              {{ groupe }}
              <button style="border: none; background-color: transparent;" @click="deleteGroupe"><i
                  class="bi bi-trash "></i></button>
            </li>

            <li v-for="groupe in groupsJoined" :key="groupe.id"
                class="list-group-item d-flex justify-content-between align-items-center">
              <span class="bi bi-people"></span>
              {{ groupe.name }}
              <span></span>
            </li>
            <li v-if="groupsJoined.length === 0 && groupsOwned.length === 0" class="list-group">
              <a class="btn fst-italic" role="button">Aucun groupe</a>
            </li>
          </ul>
          <h5 class="text-md-center mt-2">Invitations</h5>
          <ul class="list-group">
            <li v-for="invitation in invitations" :key="invitation.id"
                class="list-group-item d-flex justify-content-between align-items-center">
              {{ invitation.group.name }}
              <button class="btn btn-primary" @click="acceptInvitation(invitation.group.id)">Accepter</button>
              <button class="btn btn-danger" @click="refuseInvitation(invitation.group.id)">Refuser</button>
            </li>
            <li v-if="invitations.length === 0" class="list-group">
              <a class="btn fst-italic" role="button">Aucune invitation</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="col-md-6">
        <div>
          <div class="d-flex justify-content-center align-items-center" style="height: 100px;">
            <template v-if="avatarUrl">
              <img :src="avatarUrl" alt="Photo de profil" class="rounded-circle img-thumbnail"
                   style="width: 100px; height: 100px;">
            </template>
            <template v-else>
              <img :src="avatarPlaceholderUrl" alt="Photo de profil" class="rounded-circle img-thumbnail"
                   style="width: 100px; height: 100px;">
            </template>
          </div>

          <div class="mb-3 d-flex justify-content-between">
            <div class="my-auto me-1">
              <label class="form-label" for="formFilePicture">Mettre à jour la photo de profil</label>
              <div style="display: flex; align-items: center;">
                <input id="formFilePicture" accept="image/png, image/jpeg" class="form-control form-control-sm"
                       type="file"
                       @change="pictureToUpload = $event.target.files[0]">
                <button v-if="pictureToUpload" class="btn btn-info ms-1" @click="uploadPicture">Changer</button>
              </div>
            </div>
            <div class="my-auto">
              <label class="form-label" for="formFileRib">Mettre à jour le RIB</label>
              <div style="display: flex; align-items: center;">
                <input id="formFileRib" accept="application/pdf" class="form-control form-control-sm" type="file"
                       @change="ribToUpload = $event.target.files[0]">
                <button v-if="ribToUpload" class="btn btn-info ms-1" @click="uploadRib">Changer</button>
              </div>
            </div>
          </div>


          <form class="form">
            <div class="mb-3">
              <label class="form-label" for="pseudo">Nom d'utilisateur :</label>
              <input id="prenom" v-model="utilisateur.username" class="form-control" type="text"/>
            </div>
            <div class="mb-3">
              <label class="form-label" for="email">Email :</label>
              <input id="email" v-model="utilisateur.email" class="form-control" type="email"/>
            </div>
            <div class="d-flex justify-content-center mt-3">
              <button class="btn btn-primary" type="submit"
                      @click="updateUser">Mettre à jour
              </button>
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
  computed: {
    avatarPlaceholderUrl() {
      return 'https://api.dicebear.com/8.x/initials/svg?seed=' + this.utilisateur.username;
    }
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
      avatarUrl: '',


      //Nouveau groupe
      nomGroupe: '',
      descriptionGroupe: '',

      //Notification
      alertMessage: '',

      //Inviter a un groupe
      selectedGroup: '',
      suggestedUsers: [],
      selectedUser: {
        userName: '',
        id: ''
      },
      hasSelectedUser: false,


      //Photo de profil
      pictureToUpload: null,
      urlToUpload: '',

      //RIB
      ribToUpload: null,


    };
  },
  methods: {

    async uploadPicture() {

      try {
        // Récupérer l'URL d'upload
        const graphqlResponse = await axios.post('${process.env.VUE_APP_API_URL}', {
          query: `mutation {
        uploadProfilePicture
      }`
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });

        const responseData = graphqlResponse.data;
        if (responseData.data.uploadProfilePicture) {
          const uploadUrl = responseData.data.uploadProfilePicture;

          // Créer un objet FormData pour envoyer la photo
          const formData = new FormData();
          formData.append('file', this.pictureToUpload);

          const uploadResponse = await axios.post(uploadUrl, formData);

          // Gérer la réponse de l'upload
          console.log('Réponse de l\'upload:', uploadResponse.data);
          if (uploadResponse.status === 200) {
            this.alertMessage = 'Photo de profil mise à jour';
            var toastLive = document.getElementById('liveToast')
            toastLive.classList.add('show')
          }
          this.pictureToUpload = null;
          await this.fetchCurrentUserDetails();
        }
      } catch (error) {
        console.error('Erreur:', error);
      }
    },

    async uploadRib() {
      try {
        // Récupérer l'URL d'upload
        const graphqlResponse = await axios.post('${process.env.VUE_APP_API_URL}', {
          query: `mutation{uploadUserRib}`
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });

        const responseData = graphqlResponse.data;
        if (responseData.data.uploadUserRib) {
          const uploadUrl = responseData.data.uploadUserRib;

          // Créer un objet FormData pour envoyer le RIB
          const formData = new FormData();
          formData.append('file', this.ribToUpload);

          const uploadResponse = await axios.post(uploadUrl, formData);

          // Gérer la réponse de l'upload
          console.log('Réponse de l\'upload:', uploadResponse.data);
          if (uploadResponse.status === 200) {
            this.alertMessage = 'RIB mis à jour';
            var toastLive = document.getElementById('liveToast')
            toastLive.classList.add('show')
          }
          this.ribToUpload = null;
          await this.fetchCurrentUserDetails();
        }
      } catch (error) {
        console.error('Erreur:', error);
      }
    },

    async inviteToGroup() {
      try {
        const axios = require('axios');
        const response = await axios.post('${process.env.VUE_APP_API_URL}', {
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
          this.alertMessage = `Invitation envoyée à ${this.selectedUser.userName} pour le groupe ${responseData.data.inviteUser.group.name}`;
          var toastLive = document.getElementById('liveToast')
          toastLive.classList.add('show')
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
      this.hasSelectedUser = true;
      this.selectedUser = user;
      this.suggestedUsers = [];
    },

    async suggestUsers() {
      if (this.selectedUser.userName === '') {
        this.suggestedUsers = [];
      }
      if (this.selectedUser.userName.length > 1) {
        try {
          this.hasSelectedUser = false;
          const axios = require('axios');
          const response = await axios.post('${process.env.VUE_APP_API_URL}', {
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
      const response = await axios.post('${process.env.VUE_APP_API_URL}', {
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
        this.alertMessage = `Group "${this.nomGroupe}" created successfully`;
        toastLive.classList.add('show')
        await this.fetchCurrentUserDetails();
        this.nomGroupe = '';
        this.descriptionGroupe = '';

      }
    },

    async fetchCurrentUserDetails() {
      try {
        const axios = require('axios');
        const responseUser = await axios.post(process.env.VUE_APP_API_URL, {
          query: `{currentUser{userName, email, invitations{group{name,id}},avatarUrl}}`
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
          },
        });
        const responseDataUser = responseUser.data;
        if (responseDataUser.data) {
          this.utilisateur.username = responseDataUser.data.currentUser.userName;
          this.utilisateur.email = responseDataUser.data.currentUser.email;
          this.invitations = responseDataUser.data.currentUser.invitations;
          this.avatarUrl = responseDataUser.data.currentUser.avatarUrl;
        }
        if (responseDataUser.errors) {
          console.log("erreur" + responseDataUser.errors.message);
        }

      } catch (error) {
        console.error('Erreur:', error);
      }

      try {
        const responseUserGroups = await axios.post(process.env.VUE_APP_API_URL, {
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
            this.groupsOwned = responseDataUserGroups.data.currentUser.ownedGroups.map(group => group.name);
            this.groupsJoined = responseDataUserGroups.data.currentUser.userGroups.map(userGroup => userGroup.group);
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
        const response = await axios.post(process.env.VUE_APP_API_URL, {
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
        const response = await axios.post(process.env.VUE_APP_API_URL, {
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
          this.alertMessage = `Invitation accepted`;
          toastLive.classList.add('show')
          await this.fetchCurrentUserDetails();
        }
        console.log('Réponse pour l invitation:', responseData);
      } catch (error) {
        console.error('Erreur:', error);
      }

    },

    async refuseInvitation(groupId) {
      try {
        const axios = require('axios');
        const response = await axios.post(process.env.VUE_APP_API_URL, {
          query: `mutation {refuseInvitation(groupId: "${groupId}")}`
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
          },
        });
        const responseData = response.data;
        if (responseData.data.refuseInvitation) {
          var toastLive = document.getElementById('liveToast')
          this.alertMessage = `Invitation refusée`;
          toastLive.classList.add('show')
          await this.fetchCurrentUserDetails();
        }
        console.log('Réponse pour le refus de l invitation:', responseData);
      } catch (error) {
        console.error('Erreur:', error);

      }
    },

    async updateUser() {
      const axios = require('axios');
      const response = await axios.post(process.env.VUE_APP_API_URL, {
        query: `mutation {
  modifyMyself(
    appUserModifyDto: {
      email: "${this.utilisateur.email}",
      userName: "${this.utilisateur.username}"
    }
  ) {
    id
  }
}
`
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      const responseData = response.data;
      console.log('Réponse:', responseData);
    }
  },
};
</script>

<style scoped>

.list-group-item {
  border: none;
  background-color: var(--second-background-color);
}

</style>