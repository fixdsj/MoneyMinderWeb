
<template>
  <AppHeader />
  <p style="text-align: center">Contenu de l'application</p>
  <br>
  <AppFooter />

</template>

<script>

import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
 /* margin-top: 5px;*/
}
</style>
