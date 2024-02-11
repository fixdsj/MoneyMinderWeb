<template>
  <div class="register-container">
    <h1>Inscription</h1>
    <form @submit.prevent="register">
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
import { mapState, mapActions } from 'vuex';

export default {
  name: 'AppRegister',
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: ''
    };
  },
  computed: {
    ...mapState(['isAuthenticated'])
  },
  methods: {
    ...mapActions(['register']),
  },
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
