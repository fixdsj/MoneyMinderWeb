<template>

  <div class="container">
    <header
        class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <div class="col-md-3 mb-2 mb-md-0">
        <a class="d-inline-flex link-body-emphasis text-decoration-none" href="/">
          <i class="bi bi-cash-coin" style="font-size: 2rem;">
            <use xlink:href="/"/>
          </i>
        </a>
      </div>

      <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li><a class="nav-link px-2" href="/">Accueil</a></li>
        <li v-if="isLogged"><a class="nav-link px-2" href="/groupes">Mes groupes</a></li>
        <li v-if="isLogged"><a class="nav-link px-2" href="/messages">Messagerie</a></li>
        <li v-if="isLogged"><a class="nav-link px-2" href="/account">Mon Compte({{ currentUsername }})</a></li>
      </ul>

      <div v-if="!isLogged" class="col-md-3 text-end">
        <a class="btn btn-outline-primary me-2" href="/login" role="button">Se connecter</a>
        <a class="btn btn-primary" href="/register" role="button">S'inscrire</a>
      </div>

      <div v-if="isLogged" class="col-md-3 text-end">
        <button class="btn btn-primary me-2" @click="logout">Déconnexion</button>
      </div>
    </header>
  </div>

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
      const response = await axios.post('http://localhost:3000/graphql', {
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

</style>