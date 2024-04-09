<script>
import axios from "axios";

export default {
  name: 'AppGroupeDetails',
  data() {
    return {
      //Photo de profil
      pictureToUpload: null,
      urlToUpload: '',

      groupId: '',


      //Données de test pour le groupe
      groupe: {
        nom: 'Groupe A',
        description: 'Description du Groupe A',
        membres: [
          {id: 1, nom: 'Pierre', prenom: 'Durand', email: 'exafemple@example.com', lasttransaction: '12/03/2002'},
          {id: 2, nom: 'Paul', prenom: 'Dupond', email: 'examfeple2@example.com', lasttransaction: '05/12/2021'},
          {id: 3, nom: 'Jacques', prenom: 'Martin', email: 'exampfefle3@example.com', lasttransaction: '18/04/2021'},
          {id: 4, nom: 'Jean', prenom: 'Dujardin', email: 'example3ED@example.com  ', lasttransaction: '13/09/2011'},
        ],
      },
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
  },
};

</script>

<template>
  <div class="mb-1 d-flex align-items-center">
    <label class="form-label" for="formFile">Changer la photo de profil :</label>
    <input id="formFile" accept="image/png, image/jpeg" class="form-control form-control-sm" type="file"
           @change="pictureToUpload = $event.target.files[0]">
    <button v-if="pictureToUpload" class="btn btn-info" @click="uploadPicture">Changer</button>
  </div>
  <ul class="list-group">
    <li v-for="membre in groupe.membres" :key="membre.id" class="list-group-item">
      <p>{{ membre.prenom }} {{ membre.nom }}</p>
      <p>Email: {{ membre.email }}</p>
      <p>Dernière transaction: {{ membre.lasttransaction }}</p>
    </li>
  </ul>

</template>

<style scoped>

</style>