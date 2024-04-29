<template>

  <div class="container">
    <header class="d-flex flex-wrap align-items-center justify-content-between py-3 mb-4 border-bottom">

      <ul class="nav col-md-3 col-md-auto mb-2 mb-md-0">
        <li><a class="nav-link px-2" href="/"> <i class="bi bi-cash-coin" style="font-size: 2rem;"></i></a></li>
        <li v-if="isLogged"><a class="nav-link px-2" href="/groups"><i class="bi bi-people-fill"
                                                                       style="color: var(--button-color);font-size: 2rem;"></i></a>
        </li>
        <li v-if="isLogged"><a class="nav-link px-2" href="/messages"><i class="bi bi-chat-left-text-fill"
                                                                         style="color: var(--button-color);font-size: 2rem;"></i></a>
        </li>
      </ul>

      <div v-if="!isLogged" class="col-md-3 text-end">
        <a class="btn btn-outline-primary me-2" href="/login" role="button">Se connecter</a>
        <a class="btn btn-primary" href="/register" role="button">S'inscrire</a>
      </div>

      <div v-if="isLogged" class="col-md-3 text-end">
        <div class="dropdown">
          <a id="dropdownMenuLink" aria-expanded="false" class="btn btn-primary dropdown-toggle"
             data-bs-toggle="dropdown"
             href="#" role="button">
            {{ currentUsername }} <i class="bi bi-person-fill"></i>
          </a>

          <ul aria-labelledby="dropdownMenuLink" class="dropdown-menu">
            <li><a class="dropdown-item" href="/account">Mon compte</a></li>
            <li>
              <button class="dropdown-item" @click="logout">Déconnexion</button>
            </li>
          </ul>

        </div>
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
.container {
  background: transparent;
  backdrop-filter: blur(10px);
}
</style>
