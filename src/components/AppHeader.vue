<template>
  <!--  <div class="header-container">
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
    </div>-->
  <div class="container">
    <header
        class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <div class="col-md-3 mb-2 mb-md-0">
        <a href="/" class="d-inline-flex link-body-emphasis text-decoration-none">
          <i class="bi bi-cash-coin" style="font-size: 2rem;">
            <use xlink:href="/"/>
          </i>
        </a>
      </div>

      <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li><a href="/" class="nav-link px-2">Accueil</a></li>
        <li><a href="/groupes" class="nav-link px-2">Groupes</a></li>
        <li><a href="/notifications" class="nav-link px-2">Notifications</a></li>
        <li><a href="/account" class="nav-link px-2">Mon Compte</a></li>
      </ul>

      <div class="col-md-3 text-end">
        <a class="btn btn-outline-primary me-2" href="/login" role="button">Login</a>
        <!--        <button type="button" class="btn btn-primary" href="/register">Sign-up</button>-->
        <a class="btn btn-primary" href="/register" role="button">Sign-up</a>
      </div>
    </header>
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

</style>