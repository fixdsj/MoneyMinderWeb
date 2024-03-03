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
    <form class="p-4 p-md-5 border rounded-3 bg-body-tertiary">
      <div class="form-floating mb-3">
        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
        <label for="floatingInput">Adresse mail</label>
      </div>
      <div class="form-floating mb-3">
        <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
        <label for="floatingPassword">Mot de passe</label>
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
/*.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;  !* Ajout d'une couleur de fond *!
}

h1 {
  text-align: center;
  color: #333;
}

.form-group {
  margin-bottom: 20px;  !* Augmentation de la marge pour plus d'espace *!
}

label {
  display: block;
  margin-bottom: 8px;
  color: #333;
}

input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: border-color 0.3s;  !* Transition pour une expérience utilisateur plus fluide *!
}

input:focus {
  border-color: #4caf50;  !* Changement de couleur du bord lorsqu'il est en focus *!
}

button {
  background-color: #4caf50;
  color: #fff;
  padding: 12px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;  !* Pleine largeur du parent *!
  font-size: 16px;  !* Taille du texte légèrement augmentée *!
}

button:hover {
  background-color: #45a049;  !* Changement de couleur au survol pour une indication visuelle *!
}

p {
  text-align: center;
  margin-top: 15px;
}

router-link {
  color: #4caf50;
  text-decoration: underline;
  cursor: pointer;
}*/

</style>
