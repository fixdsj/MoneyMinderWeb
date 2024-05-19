<template>
  <div class="d-flex align-items-center justify-content-center vh-100">
    <div class="text-center row">
      <div class=" col-md-6">
        <img alt="Page non trouvée" class="img-fluid"
             src="../assets/error-404.png">
      </div>
      <div class=" col-md-6 mt-5">
        <p class="fs-3">Page not found</p>
        <p class="lead">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <a class="btn btn-primary" href="/">Back to Home</a>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'AppError404',
};
</script>

<style scoped>

</style>
