<template>
  <header>
    <div class="px-3 py-2 text-bg-dark">
      <div class="container">
        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a class="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none" href="/">
            <i class="bi bi-cash-coin" role="img" style="font-size: 24px; color:var(--button-color)"></i>
          </a>

          <ul v-if="isLogged" class="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
            <li>
              <a class="nav-link text-white" href="/">
                <i class="bi bi-house d-block text-center" style="font-size: 24px"></i>
                Accueil
              </a>
            </li>
            <li>
              <a class="nav-link text-white" href="/groups">
                <i class="bi bi-people-fill d-block text-center" style="font-size: 24px"></i>
                Groupes
              </a>
            </li>
            <li>
              <a class="nav-link text-white" href="/messages">
                <i class="bi bi-chat-left-text-fill d-block text-center" style="font-size: 24px"></i>
                Messages
              </a>
            </li>
            <li>
              <a class="nav-link text-white" href="/account">
                <i class="bi bi-person-circle d-block text-center" style="font-size: 24px"></i>
                {{ currentUsername }}
              </a>
            </li>
            <li>
              <a class="nav-link text-white" href="/login" @click="logout">
                <i class="bi bi-box-arrow-right d-block text-center" style="font-size: 24px"></i>
                Déconnexion
              </a>
            </li>
          </ul>
          <ul v-if="!isLogged" class="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
            <li>
              <a class="nav-link text-white" href="/login">
                <i class="bi bi-box-arrow-in-right d-block text-center" style="font-size: 24px"></i>
                Se connecter
              </a>
            </li>
            <li>
              <a class="nav-link text-white" href="/register">
                <i class="bi bi-person-plus d-block text-center" style="font-size: 24px"></i>
                S'inscrire
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>

</template>

<script>
import {currentUsername, isLogged} from "@/main";

export default {
  name: 'AppHeader',
  data() {
    return {
      isLogged: isLogged,
      currentUsername: currentUsername,
    };
  },
  methods: {
    async logout() {
      console.log('Déconnexion');
      const axios = require('axios');
      const response = await axios.post('${process.env.VUE_APP_API_URL}', {
        query: `mutation{signOut}`
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
        this.isLogged = false;
        this.currentUsername = 'Guest';
        this.$router.push('/');
      }
      if (responseData.errors) {
        console.log("erreur" + responseData.errors.message);
      }

    }
  }
};
</script>

<style scoped>

.text-small {
  font-size: 0.875rem;
}


</style>
