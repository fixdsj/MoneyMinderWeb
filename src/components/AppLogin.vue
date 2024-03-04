<template>


  <div class="col-md-10 mx-auto col-lg-5">
    <form class="p-4 p-md-5 border rounded-3 bg-body-tertiary" @submit="login">
      <h3 class="text-center mb-4">Connexion</h3>
      <div class="form-floating mb-3">
        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
        <label for="floatingInput">Adresse mail</label>
      </div>
      <div class="form-floating mb-3">
        <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
        <label for="floatingPassword">Mot de passe</label>
      </div>
      <small class="text-body-secondary">En cliquant sur Se connecter, vous acceptez les conditions
        d'utilisation.</small>
      <button class="w-100 btn btn-lg btn-primary" type="submit">Se connecter</button>


      <hr class="my-4">
      <h4 class="text-center my-4 text-uppercase">Ou</h4>
      <div class="d-grid mb-2">
        <a class="btn btn-google btn-login text-uppercase fw-bold" type="submit">
          <i class="bi bi-google me-2"></i> S'inscrire avec Google
        </a>
        <i class="fab fa-google me-2"></i>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AppLogin',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login() {
      console.log('Email:', this.email);
      console.log('Mot de passe:',
          this.password);
    }
  },
};
</script>

<style scoped>
.btn-google {
  color: white !important;
  background-color: #ea4335;
}

.btn-google:hover {
  background-color: #d73e2b;
}

</style>
