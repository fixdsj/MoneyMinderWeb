<template>
  <AppHeader/>
  <router-view/>
  <AppFooter/>

</template>

<script>
import {ref, watch} from 'vue'; // Importer 'ref' et 'watch' de Vue 3
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import {currentUsername, isLogged} from '@/main';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  },
  methods: {
    logout() {
      console.log('Déconnexion');
    }
  },

  setup() {
    // Créer une référence réactive à isLogged
    const isLoggedRef = ref(isLogged);

    // Observer les changements de isLogged
    watch(isLoggedRef, (newValue) => {
      if (newValue === true) {
        fetchCurrentUser();
      }
    });

    // Récupérer l'utilisateur actuel
    const fetchCurrentUser = async () => {
      try {
        const axios = require('axios');
        const response = await axios.post('http://localhost:3000/graphql', {
          query: `{currentUser{userName}}`
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
          currentUsername.value = responseData.data.currentUser[0].userName;
          isLoggedRef.value = true;
        }
        if (responseData.errors) {
          console.log("erreur" + responseData.errors.message);
          isLoggedRef.value = false;
        }

      } catch (error) {
        console.error('Erreur:', error);
      }

      console.log('Utilisateur actuel:', currentUsername.value);
    };

    return {
      isLoggedRef,
      fetchCurrentUser
    };
  },
  mounted() {
    this.fetchCurrentUser();

  }
}
</script>

<style>
#app {
  --main-background-color: #F0BE86;
  --first-text-color: white;
  --second-text-color: #3CB371;
  --second-button-color: #3CB371;
  --third-text-color: black;
  --main-header-color: #6E6E6E;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background: var(--main-background-color);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
}

* {
  margin: 0;
  padding: 0;
}
</style>
