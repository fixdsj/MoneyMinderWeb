<template>
  <div>
    <p>{{ group.description }}</p>
  </div>
  <div class="mb-3 d-flex align-items-center">
    <label class="form-label me-2" for="formFile">Change group picture</label>
    <input id="formFile" accept="image/png, image/jpeg" class="form-control form-control-sm" type="file"
           @change="pictureToUpload = $event.target.files[0]">
    <button v-if="pictureToUpload" class="btn btn-info ms-2" @click="uploadPicture">Upload</button>
  </div>

  <div class="container">
    <div class="row">
      <div v-for="member in group.members" :key="member.id" class="col-md-4 mb-3">
        <div class="card" style="opacity: 0.9 ;">
          <img
              :src="member.avatarUrl ? member.avatarUrl : 'https://api.dicebear.com/8.x/initials/svg?seed=' + member.userName"
              alt="user img"
              class="card-img-top img-fluid img-thumbnail rounded-circle mx-auto mt-2"
              style="width: 100%; max-width: 100px; height: auto;">
          <div class="card-body text-center">
            <h5 class="card-title">{{ member.userName }}</h5>
            <p class="card-text">{{
                member.lasttransaction ? 'Last transaction: ' + member.lasttransaction : 'No transaction yet'
              }}</p>
            <p class="card-text">Joined on:{{ member.joinedAt.toLocaleDateString('fr-FR', dateOptions) }}</p>
            <p class="card-text">Amount to pay: {{ member.amountToPay }} €</p>
            <p class="card-text">Email: <a :href="'mailto:' + member.email" class="email-link">{{ member.email }}</a>
            </p>
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

      group: {},
    };
  },
  methods: {
    async uploadPicture() {
      console.log('Photo envoyée:', this.pictureToUpload);

      try {
        // Récupérer l'URL d'upload
        const response = await axios.post('${process.env.VUE_APP_API_URL}', {
          query: `mutation{uploadGroupImagePicture(groupId:"${this.activeGroup.id}" )}`
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });

        const responseData = response.data;
        if (responseData.data && responseData.data.uploadGroupImagePicture) {
          const uploadUrl = responseData.data.uploadGroupImagePicture;
          const formData = new FormData();
          formData.append('file', this.pictureToUpload);

          const uploadResponse = await axios.post(uploadUrl, formData);
          console.log('uploadResponse', uploadResponse);

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
       payTo{amountToPay}
      user {
        paymentsToBeReceived {
          amountToPay
        }
        avatarUrl
        email
        userName
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
        const responseData = response.data;
        if (responseData.data) {
          this.group.description = responseData.data.groups[0].description;
          this.group.members = responseData.data.groups[0].userGroups.map((userGroup) => {
            return {
              userName: userGroup.user.userName,
              joinedAt: new Date(userGroup.joinedAt),
              amountToPay: userGroup.payTo.amountToPay,
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
.card {
  opacity: 0.9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: opacity 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  opacity: 1;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.card {
  background-color: var(--second-background-color);
}

.email-link {
  color: var(--button-color);
  text-decoration: underline;
  transition: color 0.3s ease;
}

.email-link:hover {
  color: var(--third-background-color);
}
</style>
