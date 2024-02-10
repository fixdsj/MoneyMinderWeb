

<template>
  <div class="footer-container">
    <p>© 2024 Money Minder</p>
  </div>
</template>

<script>
import app from "../App.vue";

export default {
  name: 'AppFooter',
  computed: {
    app() {
      return app
    }
  },
};
</script>

<style scoped>
.footer-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 10%;
  background-color: #c79c9c;
 color: white;
}

</style>