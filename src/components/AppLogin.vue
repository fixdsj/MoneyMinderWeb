<template>
  <!--  <div class="login-container">
      <h1>Connexion</h1>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Mot de passe:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button @click="login" type="submit">Se connecter</button>
      </form>
      <p>Pas encore de compte? <router-link to="/register">Inscrivez-vous</router-link></p>
      <router-link to="/connectwithgoogle">Se connecter avec Google</router-link>
    </div>-->

  <div class="col-md-10 mx-auto col-lg-5">
    <form class="p-4 p-md-5 border rounded-3 bg-body-tertiary" @submit.prevent="login">
      <h3 class="text-center mb-4">Inscription</h3>
      <div class="form-floating mb-3">
        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
        <label for="floatingInput">Adresse mail</label>
      </div>
      <div class="form-floating mb-3">
        <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
        <label for="floatingPassword">Mot de passe</label>
      </div>
      <div class="d-grid mb-2">
        <a class="btn btn-google btn-login text-uppercase fw-bold" type="submit">
          <i class="bi bi-google me-2"></i> Sign in with Google
        </a>
      </div>
      <button class="w-100 btn btn-lg btn-primary" type="submit">Se connecter</button>
      <hr class="my-4">
      <small class="text-body-secondary">By clicking Sign up, you agree to the terms of use.</small>
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
