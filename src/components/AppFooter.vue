<template>
  <div class="container">
    <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <div class="col-md-4 d-flex align-items-center">
        <a class="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1" href="/">
          <svg class="bi" height="24" width="30">
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
export default {
  name: 'AppFooter',
};
</script>

<style scoped>


</style>