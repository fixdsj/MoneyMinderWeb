<template>
  <div class="container-fluid">
    <footer class="d-flex flex-wrap justify-content-between align-items-center py-3">
      <div class="col-md-4 d-flex align-items-center">
        <span class="mb-3 mb-md-0 text-white">&copy; 2024 Money Minder</span>
      </div>

      <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
        <li class="ms-3"><a class="text-white link-underline-light" href="/privacy-policy">Politique de
          confidentialité</a></li>
        <li class="ms-3"><a class="text-white" href="https://twitter.com/" target="_blank"><i
            class="bi bi-twitter"></i></a></li>
        <li class="ms-3"><a class="text-white" href="https://instagram.com/" target="_blank"><i
            class="bi bi-instagram"></i></a></li>
      </ul>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'AppFooter',
};
</script>

<style scoped>
.container-fluid {
  background-color: var(--main-background-color);
}

</style>
