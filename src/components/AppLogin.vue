<template>

  <div class="col-md-10 mx-auto col-lg-5">
    <form class="p-4 p-md-5 border rounded-3 bg-body-tertiary" @submit="login">
      <h3 class="text-center mb-4">Connexion</h3>
      <p class="text-danger" v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <b v-for="(error, index) in errors" :key="index">{{ error }}</b>
      </p>
      <div class="form-floating mb-3">
        <input type="text" class="form-control" id="username" placeholder="Votre pseudo" v-model="username">
        <label for="username">Adresse mail</label>
      </div>
      <div class="form-floating mb-3">
        <input type="password" class="form-control" id="password" placeholder="Password" v-model="password">
        <label for="floatingPassword">Mot de passe</label>
      </div>
      <div class="form-check mb-3">
        <input class="form-check-input" type="checkbox" value="" id="rememberPassword" v-model="rememberPassword">
        <label class="form-check-label" for="rememberPassword">
          Se souvenir de moi
        </label>
      </div>
      <small class="text-body-secondary">En cliquant sur Se connecter, vous acceptez les conditions
        d'utilisation.</small>
      <button class="w-100 btn btn-lg btn-primary" type="submit">Se connecter</button>

      <hr class="my-4">
      <h4 class="text-center my-4 text-uppercase">Ou</h4>
      <div class="d-grid mb-2">
        <a class="btn btn-google btn-login text-uppercase fw-bold" type="submit">
          <i class="bi bi-google me-2"></i> Se connecter avec Google
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
      username: '',
      password: '',
      rememberPassword: false,
      errors: [],
    };
  },
  methods: {

    async login() {
      event.preventDefault();

      console.log('Données saisies :', this.username, this.password);
      const response = await fetch('http://localhost:3000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `mutation{
   signIn(appUserLoginDto: {
    username:"${this.username}",
    password:"${this.password}",
    rememberMe:${this.rememberPassword}


   })
   {
    succeeded,
    isNotAllowed,
   }
}
`
        })

      });
      const responseData = await response.json();
      if (!responseData.data.signIn.succeeded) {
        this.errors = ['Vérifiez vos informations de connexion'];

      }
      if (responseData.data.signIn.succeeded) {
        alert('Utilisateur connecté avec succès');
      }
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
