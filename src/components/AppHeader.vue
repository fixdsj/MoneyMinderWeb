<template>

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
        <li><a href="/groupes" class="nav-link px-2">Mes groupes</a></li>
        <li><a href="/messages" class="nav-link px-2">Messagerie</a></li>
        <li><a href="/account" class="nav-link px-2">Mon Compte</a></li>
      </ul>

      <div class="col-md-3 text-end">
        <a class="btn btn-outline-primary me-2" href="/login" role="button">Se connecter</a>
        <a class="btn btn-primary" href="/register" role="button">S'inscrire</a>
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