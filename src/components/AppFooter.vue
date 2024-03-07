<template>
  <div class="container">
    <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <div class="col-md-4 d-flex align-items-center">
        <a href="/" class="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
          <svg class="bi" width="30" height="24">
            <use xlink:href="#bootstrap"/>
          </svg>
        </a>
        <span class="mb-3 mb-md-0 text-body-secondary">&copy; 2024 Money Minder</span>
      </div>

      <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
        <li class="ms-3"><a class="text-body-secondary" href="#"><i class="bi bi-twitter">
          <use xlink:href="#twitter"/>
        </i></a></li>
        <li class="ms-3"><a class="text-body-secondary" href="#"><i class="bi bi-facebook">
          <use xlink:href="#facebook"/>
        </i></a></li>
        <li class="ms-3"><a class="text-body-secondary" href="#"><i class="bi bi-instagram">
          <use xlink:href="#instagram"/>
        </i></a></li>
      </ul>
    </footer>
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
  background-color: var(--main-header-color);
  color: var(--first-text-color);
}

</style>