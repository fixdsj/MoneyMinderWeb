<template>
  <div>
    <section class="main-section">
      <h1>MoneyMinder</h1>
      <p>Partagez facilement vos dépenses et suivez les comptes en toute simplicité.</p>
      <router-link to="register" class="cta-button">S'inscrire</router-link>
    </section>

    <section class="main-section">
      <h2>Comment ça marche?</h2>
      <p>MoneyMinder vous permet de créer des comptes partagés, d'ajouter des dépenses et de suivre les remboursements entre amis, famille ou collègues.</p>
    </section>

    <section class="main-section">
      <h2>Fonctionnalités principales</h2>
      <ul>
        <li>Création de comptes partagés</li>
        <li>Ajout facile des dépenses</li>
        <li>Suivi des remboursements</li>
        <li>Notifications pour les mises à jour</li>
      </ul>
    </section>

    <section class="main-section">
      <h2>Téléchargez l'application</h2>
      <p>MoneyMinder est disponible sur iOS et Android. Téléchargez l'application dès maintenant pour commencer à gérer vos finances de manière collaborative.</p>
      <router-link to="#download" class="cta-button">Télécharger</router-link>
    </section>
  </div>
</template>

<script>
import app from "../App.vue";

export default {
  name: 'AppHome',
  computed: {
    app() {
      return app
    }
  },
};
</script>

<style scoped>
.main-section {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  color: #333;
  font-size: 2em;
}

p {
  color: #555;
  font-size: 1.2em;
}

.cta-button {
  display: inline-block;
  padding: 12px 24px;
  background-color: #3498db;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  font-size: 1.1em;
}

.cta-button:hover {
  background-color: #2980b9;
}

section {
  margin: 20px 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 8px;
  color: #333;
  font-size: 1.1em;
}

h2 {
  color: #3498db;
  border-bottom: 2px solid #3498db;
  padding-bottom: 8px;
  margin-bottom: 16px;
  font-size: 1.5em;
}
</style>
