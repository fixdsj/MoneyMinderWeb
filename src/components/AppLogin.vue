<template>
  <div class="container">
    <div class="row align-items-center">
      <div class="col-md-6">
        <form class="p-4 p-md-5" @submit="signIn">
          <h3 class="text-center mb-4">Connexion</h3>
          <p v-if="errors.length" class="text-danger">
            <b>Erreur(s): </b>
            <b v-for="error in errors" :key="error">{{ error }}</b>
          </p>
          <div class="form-floating mb-3">
            <input id="username" v-model="username" class="form-control form-styling" placeholder="Votre pseudo"
                   required
                   type="text">
            <label for="username">Nom d'utilisateur</label>
          </div>

          <div class="form-floating mb-3 position-relative">
            <input id="password" v-model="password" :type="showPassword ? 'text' : 'password'"
                   class="form-control pr-5 form-styling"
                   placeholder="Password" required>
            <label for="password">Mot de passe</label>
            <button class="btn position-absolute end-0 translate-middle-y" style="top: 50%;" type="button"
                    @click="toggleShowPassword">
              <i :class="showPassword ?  'bi-eye-slash-fill':'bi-eye-fill'"></i>
            </button>
          </div>
          <div class="form-check mb-3">
            <input id="rememberPassword" v-model="rememberPassword" class="form-check-input" type="checkbox" value="">
            <label class="form-check-label" for="rememberPassword">
              Se souvenir de moi
            </label>
          </div>
          <small class="text-body-secondary">En cliquant sur Se connecter, vous acceptez les conditions
            d'utilisation.</small>
          <button class="w-100 btn btn-lg btn-primary" type="submit">Se connecter</button>

          <h4 class="text-center my-4 text-uppercase">Ou</h4>
          <div class="d-grid mb-2">
            <a class="btn btn-google btn-login text-uppercase fw-bold" type="submit">
              <i class="bi bi-google me-2"></i> Se connecter avec Google
            </a>
            <i class="fab fa-google me-2"></i>
          </div>
        </form>
      </div>
      <div class="col-md-5">
        <img alt="" class="img-fluid mx-auto d-block" height="412" size="412"
             src="../assets/illustrations/signup_illustration.svg">
      </div>
    </div>
  </div>
</template>


<script>
import {currentUsername, isLogged} from "@/main";
import axios from "axios";

export default {
  name: 'AppLogin',
  data() {
    return {
      username: '',
      password: '',
      rememberPassword: true,
      errors: [],
      showPassword: false,
      isLogged: isLogged,
      currentUsername: currentUsername,
    };
  },
  methods: {
    async signIn(event) {
      event.preventDefault();
      console.log('Données saisies :', this.username, this.password);
      this.errors = [];


      try {
        const response = await axios.post('${process.env.VUE_APP_API_URL}', {
          query: `
          mutation {
            signIn(appUserLoginDto: {
              username: "${this.username}"
              password: "${this.password}"
              rememberMe: ${this.rememberPassword}
            }) {
              succeeded
              isLockedOut
              isNotAllowed
              }
          }
        `,
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
          },
        });

        const responseData = response.data;
        console.log('Réponse:', responseData);
        if (responseData.data) {
          if (responseData.data.signIn.succeeded) {
            console.log('Connexion réussie');
            isLogged.value = true;
            currentUsername.value = this.username;
            this.$router.push('/account');
          }
        }
        if (responseData.errors) {
          this.errors.push(responseData.errors[0].message);
          console.log("erreur dans le tableau" + this.errors);
        }

      } catch (error) {
        console.error('Erreur de connexion :', error);

      }
    },

    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },

    /* authWithGoogle() {
       console.log('Authentification avec Google')

     }*/
    /*Vue.googleAuth().signIn(function (authorizationCode) {

      // things to do when sign-in succeeds

      // You can send the authorizationCode to your backend server for further processing, for example
      this.$http.post('http://your/backend/server', { code: authorizationCode, redirect_uri: 'postmessage' }).then(function (response) {
        if (response.body) {
          // ...
        }
      }, function (error) {
        console.log(error)
      })

    }, function (error) {
      // things to do when sign-in fails
    ));*/


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

.form-styling {
  width: 100%;
  height: 35px;
  padding-left: 15px;
  border-radius: 25px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, .2);
}

</style>
