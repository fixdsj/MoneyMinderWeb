<template>
  <div class="header-container">
    <h1>Money Minder</h1>
    <nav>
      <router-link class="menu" to="/">Accueil</router-link>
      <router-link class="menu" to="/groupes">Groupes</router-link>
      <router-link class="menu" to="/notifications">Notifications</router-link>
      <button class="menu" v-if="!isAuthenticated" @click="login">Connexion / Inscription</button>
      <button class="menu" v-else @click="logout">Compte</button>
    </nav>
  </div>
</template>

<script>
import {mapState ,mapActions} from 'vuex'

export default {
  name: 'AppHeader',
  computed: {
    ...mapState(['isAuthenticated'])
    },
  methods: {
    ...mapActions(['login', 'logout']),
  },
};
</script>

<style scoped>

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 10%;
  background-color: #c79c9c;
  color: white;
  position: sticky;
  top: 0;
  z-index: 1;
}

.header-container h1 {
  margin: 0;
  font-size: 24px;
}

.menu {
  background: none;
  font: inherit;
  padding: 0.75em 2em;
  color: inherit;
  border: none;
  text-decoration: none;

}
.menu:hover {
  border: solid 1px white;
  border-radius: 1em;
}
</style>
