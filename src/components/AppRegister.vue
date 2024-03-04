<template>
  <div class="col-md-10 mx-auto col-lg-5">
    <form class="p-4 p-md-5 border rounded-3 bg-body-tertiary" @submit="register">
      <h3 class="text-center mb-4">Inscription</h3>
      <p class="text-danger" v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul class="mb-0 list-unstyled">
          <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
        </ul>
      </p>
      <div class="form-floating mb-3">
        <input type="text" class="form-control" id="pseudo" v-model="pseudo" placeholder="Pseudo">
        <label for="pseudo">Pseudo</label>
      </div>
      <div class="form-floating mb-3">
        <input type="email" class="form-control" id="email" v-model="email" placeholder="name@example.com">
        <label for="email">Adresse mail</label>
      </div>
      <div class="form-floating mb-3">
        <input type="password" class="form-control" id="password" v-model="password" placeholder="Password">
        <label for="password">Mot de passe</label>
      </div>
      <div class="form-floating mb-3">
        <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword"
               placeholder="Password">
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
    };
  },

  methods: {

    async register() {
      event.preventDefault();
      if (this.password !== this.confirmPassword) {
        this.errors = ['Les mots de passe ne correspondent pas'];
        return;
      }

      console.log('Données saisies :', this.pseudo, this.email, this.password);
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
        alert('Utilisateur créé avec succès');
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
