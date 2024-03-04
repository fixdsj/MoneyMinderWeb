<template>
  <div class="col-md-10 mx-auto col-lg-5">
    <form class="p-4 p-md-5 border rounded-3 bg-body-tertiary">
      <h3 class="text-center mb-4">Inscription</h3>
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
        <input type="password" class="form-control" id="confirmPassword" placeholder="Password">
        <label for="confirmPassword">Confirmer le mot de passe</label>
      </div>
      <button class="w-100 btn btn-lg btn-primary" type="submit" @click="register">S'inscrire</button>
      <hr class="my-4">
      <small class="text-body-secondary">En cliquant sur S'inscrire, vous acceptez les conditions d'utilisation.</small>
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
    };
  },

  methods: {
    async register() {
      try {
        console.log('Données saisies :', this.pseudo, this.email, this.password);
        const url = 'http://localhost:3000/graphql';
        const requeteGraphQL = `
    mutation ((appUserInsertDto:($pseudo: String!, $email: String!, $password: String!) {
    createUser(userName: $pseudo, email: $email, password: $password, role: "User") {
      pseudo
    })
  }
`;

        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: requeteGraphQL,
            variables: {
              pseudo: this.pseudo,
              email: this.email,
              password: this.password,
              role: "User"
            },
          }),
        };

        const reponse = await fetch(url, options);
        const result = await reponse.json();

        if (result.errors) {
          console.error('Erreur lors de la requête :', result.errors);
        } else {
          console.log('Données retournées :', result.data);
        }

        const {data} = await reponse.json();

        console.log('Données retournées :', data);
      } catch (error) {
        console.error('Erreur lors de la requête :', error);
      }
    },


  }
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
