<template>
  <div class="register-container">
    <h1>Inscription</h1>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="pseudo">Pseudo :</label>
        <input type="text" id="pseudo" v-model="pseudo" required />
      </div>
      <div class="form-group">
        <label for="email">Email :</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Mot de passe :</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirmez le mot de passe :</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" required />
      </div>
      <button @click="register" type="submit">S'inscrire</button>
    </form>
    <p>Déjà un compte? <router-link to="/login">Connectez-vous</router-link></p>
    <p>Ajouter le bouton connexion avec google</p>
  </div>
</template>

<script>
import { useMutation } from '@vue/apollo-composable';
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
          const { data } = await this.registerUser({
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
    const { mutate: registerUser } = useMutation(REGISTER_USER);

    return {
      registerUser
    };
  }
};
</script>


<style scoped>
.register-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #7d99aa;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background-color: #4caf50;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
