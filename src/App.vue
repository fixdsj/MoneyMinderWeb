<template>
  <AppHeader/>
  <router-view/>
  <AppFooter/>

</template>

<script>
import {ref, watch} from 'vue';
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
    const isLoggedRef = ref(isLogged);

    watch(isLoggedRef, (newValue) => {
      if (newValue === true) {
        fetchCurrentUser();
      }
    });
    const fetchCurrentUser = async () => {
      try {
        const axios = require('axios');
        const response = await axios.post('${process.env.VUE_APP_API_URL}', {
          query: `{currentUser{userName}}`
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
          },
        });
        const responseData = response.data;
        if (responseData.data && responseData.data.currentUser) {
          currentUsername.value = responseData.data.currentUser.userName;
          isLoggedRef.value = true;
        }
        if (responseData.errors && responseData.errors.message !== undefined) {
          console.log("erreur " + responseData.errors.message);
          isLoggedRef.value = false;
        }

      } catch (error) {
        console.error('Erreur:', error);
      }

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
  --main-background-color: #fbfbfc;
  --second-background-color: #CCD5AE;
  --third-background-color: #D4A373;
  --first-text-color: white;
  --second-text-color: #3CB371;
  --button-color: #D4A373;
  --second-button-color: #CCD5AE;
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

::-webkit-scrollbar {
  width: 8px;

}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 8px;
}
</style>
