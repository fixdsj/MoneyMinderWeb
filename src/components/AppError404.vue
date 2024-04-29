<template>
  <div class="d-flex align-items-center justify-content-center vh-100">
    <div class="text-center row">
      <div class=" col-md-6">
        <img alt="Page non trouvée" class="img-fluid"
             src="../assets/error-404.png">
      </div>
      <div class=" col-md-6 mt-5">
        <p class="fs-3"><span class="text-danger">Zut!</span> Page non trouvée.</p>
        <p class="lead">
          La page que vous cherchez n'existe pas.
        </p>
        <a class="btn btn-primary" href="/">Retour à l'accueil</a>
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
