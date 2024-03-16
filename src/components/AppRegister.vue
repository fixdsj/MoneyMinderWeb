<template>
  <div class="col-md-10 mx-auto col-lg-5">
    <form class="p-4 p-md-5 border rounded-3 bg-body-tertiary" @submit="register">
      <h3 class="text-center mb-4">Inscription</h3>
      <p v-if="errors.length" class="text-danger">
        <b>Please correct the following error(s):</b>
        <ul class="mb-0 list-unstyled">
          <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
        </ul>
      </p>
      <div class="form-floating mb-3">
        <input id="pseudo" v-model="pseudo" class="form-control" placeholder="Pseudo" type="text">
        <label for="pseudo">Pseudo</label>
      </div>
      <div class="form-floating mb-3">
        <input id="email" v-model="email" class="form-control" placeholder="name@example.com" type="email">
        <label for="email">Adresse mail</label>
      </div>
      <div class="form-floating mb-3">
        <input id="password" v-model="password" class="form-control" placeholder="Password" type="password">
        <label for="password">Mot de passe</label>
        <small class="text-warning">Le mot de passe doit contenir au moins 8 caractères, un chiffre, une
          majuscule et une minuscule.</small>
      </div>
      <div class="form-floating mb-3">
        <input id="confirmPassword" v-model="confirmPassword" class="form-control" placeholder="Password"
               type="password">
        <label for="confirmPassword">Confirmer le mot de passe</label>
      </div>
      <small class="text-body-secondary">En cliquant sur S'inscrire, vous acceptez les conditions d'utilisation.</small>
      <button class="w-100 btn btn-lg btn-primary" type="submit">S'inscrire</button>
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
  name: 'VueRegister',
  data() {
    return {
      pseudo: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: [],
      success: false,
    };
  },

  methods: {

    async register() {
      event.preventDefault();
      if (this.password !== this.confirmPassword) {
        this.errors = ['Les mots de passe ne correspondent pas'];
        return;
      }
      try {
        const response = await fetch('http://localhost:3000/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `mutation CreateUser {
    createUser(
        appUserInsertDto: {
            userName: "${this.pseudo}"
            email: "${this.email}"
            password: "${this.password}"
            role: "User"
        }
    ) {
        balance
        id
        userName
        email
    }
}
`
          })

        });
        const responseData = await response.json();
        if (responseData.errors) {
          this.errors = ['Erreur : ' + responseData.errors[0].message];

        }
        if (responseData.data.createUser !== null) {
          this.success = true;

          /* // Rediriger vers la page de connexion après 2 secondes
           await new Promise(resolve => setTimeout(resolve, 2000));*/

          this.$router.push('/login');
        }
      } catch (e) {
        console.error(e);
        this.errors = ['Une erreur est survenue lors de l\'inscription'];
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
