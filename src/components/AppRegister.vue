<template>
  <div class="col-md-10 mx-auto col-lg-5">

    <form class="p-4 p-md-5 border rounded-3 bg-body-tertiary">
      <h3 class="text-center mb-4">Inscription</h3>
      <div class="form-floating mb-3">
        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
        <label for="floatingInput">Adresse mail</label>
      </div>
      <div class="form-floating mb-3">
        <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
        <label for="floatingPassword">Mot de passe</label>
      </div>
      <div class="form-floating mb-3">
        <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
        <label for="floatingPassword">Confirmer le mot de passe</label>
      </div>
      <button class="w-100 btn btn-lg btn-primary" type="submit">S'inscrire</button>
      <hr class="my-4">
      <small class="text-body-secondary">En cliquant sur S'inscrire, vous acceptez les conditions d'utilisation.</small>
    </form>
  </div>
</template>

<script>
import {useMutation} from '@vue/apollo-composable';
import gql from 'graphql-tag';

const REGISTER_USER = gql`
  mutation RegisterUser($input: AppUserInsertDtoInput!) {
    registerUser(input: $input) {
      id
      userName
      email
      role
    }
  }
`
;

export default {
  name: 'AppRegister',
  data() {
    return {
      pseudo: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  },

  methods: {
    async register() {
      if (this.password !== this.confirmPassword) {
        alert('Les mots de passe ne correspondent pas');
      } else {
        try {
          const {data} = await this.registerUser({
            input: {
              userName: this.pseudo,
              email: this.email,
              password: this.password,
              role: 'User'
            }
          });

          console.log('Utilisateur inscrit:', data.registerUser);
        } catch (error) {
          console.error('Erreur lors de l\'inscription:', error.message);
        }
      }
    }
  },

  setup() {
    const {mutate: registerUser} = useMutation(REGISTER_USER);

    return {
      registerUser
    };
  }
};
</script>


<style scoped>
</style>
