
<template>
  <div class="home">
    <h1>Accueil</h1>
  </div>

</template>

<script>
import app from "../App.vue";

export default {
  name: 'AppHome',
  computed: {
    app() {
      return app
    }
  },
};
</script>

<style scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 10%;
  color: black;
  background-color: var(--main-background-color);
}


</style>