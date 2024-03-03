<template>
  <carousel>
    <slide>
      <img src="../assets/example_carrousel.jpg" alt="Slide 1">
    </slide>
    <slide>
      <img src="../assets/example_carrousel.jpg" alt="Slide 2">
    </slide>
    <slide>
      <img src="../assets/example_carrousel.jpg" alt="Slide 3">
    </slide>
  </carousel>

</template>

<script>
import {Carousel, Slide} from 'vue-carousel';

export default {
  data() {
    return {
      components: {
        Carousel,
        Slide,
      },
      currentSlide: 0,
      slides: [
        {
          title: "Simplifiez vos dépenses",
          description: "Gérez facilement les dépenses partagées avec vos amis et votre famille.",
        },
        {
          title: "Équilibrez les comptes",
          description: "Suivez les dépenses de chacun et équilibrez les comptes en un clin d'œil.",
        },
        {
          title: "Partagez des souvenirs",
          description: "Capturez et partagez vos moments spéciaux avec la fonctionnalité de journal.",
        },
      ],
    };
  },

};
</script>

<style scoped>

</style>