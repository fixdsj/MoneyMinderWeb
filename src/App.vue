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
      const response = await fetch('http://localhost:3000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `{currentUser{userName}}`
        })
      });
      const responseData = await response.json();
      console.log('Réponse:', responseData);
      currentUsername.value = responseData.data.currentUser.userName;

      if (responseData.errors) {
        console.log("erreur" + responseData.errors.message);
      }
      console.log('Utilisateur actuel:', currentUsername.value);

    };

    return {
      isLoggedRef,
      fetchCurrentUser
    };
  }
}
</script>

<style>
#app {
  --main-background-color: linear-gradient(to right, #d3cce3, #e9e4f0);

  --first-text-color: white;
  --second-text-color: #BAFF39;
  --second-button-color: #BAFF39;
  --third-text-color: black;
  --main-header-color: #6E6E6E;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background-image: var(--main-background-color);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  margin: 0;
  padding: 0;
}
</style>
