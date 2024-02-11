<template>
  <div class="error-404">
    <h1>Page non trouvée 😐</h1>
    <p>On dirait que vous vous êtes aventuré en territoire inconnu. Cette page n'existe pas.</p>
    <p>Ne vous inquiétez pas, nous avons envoyé une équipe de recherche pour retrouver la page manquante. En attendant, régalez-vous avec ce mème de chat</p>
    <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmFjdzZzZmc0OTJmdXQ5NGoyMGU1ZG9sdjlhcG9wczNrb21lc25uaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/RhrAmVUHxjTQvEPBWi/giphy.gif" alt="Funny Cat Meme">
  </div>
</template>

<script>
export default {
  name: 'AppError404',
};
</script>

<style scoped>
.error-404 {
  text-align: center;
  margin: 50px;
}

img {
  max-width: 100%;
  height: auto;
  margin: 20px 0;
}
</style>
