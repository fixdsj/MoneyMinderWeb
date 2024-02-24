<template>
  <div class="header-container">
    <h1>Money Minder</h1>
    <nav>
      <label for="toggle" @click="toggleMenu" >☰</label>
      <div class="main_pages" :class="{ 'openmenu': menuOpen }">
        <router-link class="menu" to="/" >Accueil</router-link>
        <router-link class="menu" to="/groupes" >Groupes</router-link>
        <router-link class="menu" to="/notifications" >Notifications</router-link>
        <router-link class="menu" v-if="isAuthenticated" to="/account" @click="closeMenu">Mon compte</router-link>
        <router-link class="menu" v-if="!isAuthenticated"  to="/login">Connexion / Inscription</router-link>
        <button class="menu" v-else @click="logout">Déconnexion</button>
      </div>
    </nav>
  </div>
</template>

<script>

export default {
  name: 'AppHeader',
  data() {
    return {
      menuOpen: false
    };
  },
  mounted() {
    this.menuOpen = false;
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
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
  background-color: var(--main-header-color);
  color: white;
  position: sticky;
  top: 0;
  z-index: 1;
}

.header-container h1 {
  margin: 0;
  font-size: 24px;
  color: var(--third-text-color);
  background-color: var(--second-button-color);
  padding: 0.5em 1em;
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
  border: solid 1px var(--second-text-color);
 /* border-radius: 1em;*/
  color: var(--second-text-color);
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