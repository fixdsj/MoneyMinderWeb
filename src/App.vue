<template>
  <AppHeader/>
  <router-view/>
  <AppFooter/>

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
