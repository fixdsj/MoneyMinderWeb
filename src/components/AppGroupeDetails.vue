<template>
  <div>
    <p>{{ groupe.description }}</p>
  </div>
  <div class="mb-1 d-flex align-items-center">
    <label class="form-label" for="formFile">Changer la photo de profil :</label>
    <input id="formFile" accept="image/png, image/jpeg" class="form-control form-control-sm" type="file"
           @change="pictureToUpload = $event.target.files[0]">
    <button v-if="pictureToUpload" class="btn btn-info" @click="uploadPicture">Changer</button>
  </div>
  <!--  <ul class="list-group">
      <li v-for="membre in groupe.member" :key="membre.id" class="list-group-item">
        <p>{{ membre.prenom }} {{ membre.nom }}</p>
        <p>Email: {{ membre.email }}</p>
        <p>Dernière transaction: {{ membre.lasttransaction }}</p>
      </li>
    </ul>-->
  <!--  <div class="progress">
      <div class="progress-bar bg-success" role="progressbar" style="width: 75%" aria-valuenow="75" aria-valuemin="50" aria-valuemax="100"></div>
    </div>-->

</template>
<script>
import axios from "axios";

export default {
  name: 'AppGroupeDetails',
  props: {
    activeGroup: Object
  },
  data() {
    return {
      //Photo de profil
      pictureToUpload: null,
      urlToUpload: '',
      dateOptions: {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      },

      //Données de test pour le groupe
      group: {},
    };
  },
  methods: {
    async uploadPicture() {
      console.log('Photo envoyée:', this.pictureToUpload);

      try {
        // Récupérer l'URL d'upload
        const graphqlResponse = await axios.post('${process.env.VUE_APP_API_URL}', {
          query: `mutation{uploadGroupImagePicture(groupId:"${this.groupId}" )}`
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

          this.pictureToUpload = null;
        }
      } catch (error) {
        console.error('Erreur:', error);
      }
    },
    async fetchGroupDetails() {
      try {
        const axios = require('axios');
        const response = await axios.post('${process.env.VUE_APP_API_URL}', {
          query: `query {
  groups(where: { name: { contains: "${this.activeGroup.name}" } }) {
  description
    userGroups {
      joinedAt
      user {
        userName
        balance
      }
    }
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
        console.log('response', response);
        const responseData = response.data;
        if (responseData.data) {
          console.log('responseData.data.groups[0].description', responseData.data.groups[0].description);
          this.group.description = responseData.data.groups[0].description;
          /*this.group.members = responseData.data.groups[0].userGroups.map((userGroup) => {
            return {
              userName: userGroup.user.userName,
              balance: userGroup.user.balance,
              joinedAt: new Date(userGroup.joinedAt),
            };
          });*/
        }
        if (responseData.errors) {
          console.log("erreur" + responseData.errors.message);
        }
      } catch (error) {
        console.error('Erreur:', error);
      }

    },
  },
  mounted() {
    this.fetchGroupDetails();
  }
};

</script>


<style scoped>

</style>