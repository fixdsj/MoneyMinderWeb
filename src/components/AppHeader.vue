<template>
  <div class="header-container">
    <h1>Money Minder</h1>
    <nav>
      <label for="toggle" @click="toggleMenu" >☰</label>
      <div class="main_pages" :class="{ 'openmenu': menuOpen }">
        <router-link class="menu" to="/" @click="closeMenu">Accueil</router-link>
        <router-link class="menu" to="/groupes" @click="closeMenu">Groupes</router-link>
        <router-link class="menu" to="/notifications" @click="closeMenu">Notifications</router-link>
        <router-link class="menu" v-if="isAuthenticated" to="/account" @click="closeMenu">Mon compte</router-link>
        <button class="menu" v-if="!isAuthenticated" @click="login">Connexion / Inscription</button>
        <button class="menu" v-else @click="logout">Déconnexion</button>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'AppHeader',
  data() {
    return {
      menuOpen: false
    };
  },
  computed: {
    ...mapState(['isAuthenticated'])
  },
  mounted() {
    this.menuOpen = false;
  },
  methods: {
    ...mapActions(['login', 'logout']),
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
      console.log("le menu est ouvert"+this.menuOpen);
    },
  }
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
  text-align: center;
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
label
{
  display: none;
}
@media all and (max-width: 991px) {
  .main_pages {
    display: none;
    flex-direction: column;
  }

  nav .main_pages a, nav .main_pages button {
    width: 100%;
  }

  label {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    font-size: 40px;
    color: white;
    cursor: pointer;
  }

  .openmenu {
    display: flex;
    flex-direction: column;
  }

  #toggle {
    display: none;
  }
}
</style>