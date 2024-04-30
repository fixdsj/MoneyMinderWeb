<template>
  <div>
    <p>{{ group.description }}</p>
  </div>
  <div class="mb-3 d-flex align-items-center">
    <label class="form-label me-2" for="formFile">Changer la photo de profil :</label>
    <input id="formFile" accept="image/png, image/jpeg" class="form-control form-control-sm" type="file"
           @change="pictureToUpload = $event.target.files[0]">
    <button v-if="pictureToUpload" class="btn btn-info ms-2" @click="uploadPicture">Changer</button>
  </div>

  <div class="container">
    <div class="row">
      <div v-for="member in group.members" :key="member.id" class="col-md-4 mb-3">
        <div class="card">
          <div class="card-body d-flex align-items-center">
            <img
                :src="member.avatarUrl ? member.avatarUrl : 'https://avatar.iran.liara.run/username?username=' + member.userName"
                alt="user img"
                class="img-fluid img-thumbnail rounded-circle me-3"
                style="width: 50px; height: 50px;">

            <div>
              <h5 class="card-title mb-1">{{ member.userName }}</h5>
              <p class="card-text mb-1">
                {{ member.lasttransaction ? 'Dernière transaction: ' + member.lasttransaction : 'Pas de transaction' }}
              </p>
              <p class="card-text mb-1">Email: {{ member.email }}</p>
              <p class="card-text mb-0">Solde: {{ member.balance }}€</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
        paymentsToBeReceived {
          amountToPay
        }
        avatarUrl
        email
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
          this.group.members = responseData.data.groups[0].userGroups.map((userGroup) => {
            return {
              userName: userGroup.user.userName,
              balance: userGroup.user.balance,
              joinedAt: new Date(userGroup.joinedAt),
              avatarUrl: userGroup.user.avatarUrl,
              email: userGroup.user.email,
              paymentsToBeReceived: userGroup.user.paymentsToBeReceived,
            };
          });
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
  },
  watch: {
    activeGroup() {
      this.fetchGroupDetails();
    },
  },
};

</script>


<style scoped>

</style>
