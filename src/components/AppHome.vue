<template>
  <div class="px-4 py-5 my-5 text-center">
    <i class="bi bi-cash-coin" style="font-size: 3rem;"></i>
    <h1 class="display-5 fw-bold text-body-emphasis">Simplifiez vos dépenses</h1>
    <div class="col-lg-6 mx-auto">
      <p class="lead mb-4">Simplifiez vos dépenses et gérer facilement les dépenses partagées avec vos amis et votre
        famille.</p>
      <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <button type="button" class="btn btn-primary btn-lg px-4 gap-3">Inscrivez-vous</button>
        <button type="button" class="btn btn-outline-secondary btn-lg px-4">En savoir plus</button>
      </div>
    </div>
  </div>
  <div class="testimonial-section">
    <div class="testimonial-carousel">
      <div v-for="(testimonial, index) in testimonials" :key="index" class="testimonial">
        <p>{{ testimonial.text }}</p>
        <p class="author">{{ testimonial.author }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import app from "../App.vue";
/*import AppCarousel from "@/components/AppCarousel.vue";*/

export default {
  name: 'AppHome',
  /*components: {AppCarousel},*/

  computed: {
    app() {
      return app
    }
  },
  data() {
    return {
      testimonials: [
        {
          text: "J'utilise Money Minder avec ma famille depuis des années. Cela me fait un gain de temps (et d'argent) considérables.",
          author: "Antoine Dupont"
        },
        {
          text: "Money Minder m'aide à gérer mes dépenses avec mes amis. C'est simple et efficace.",
          author: "Jean Martin"
        },
        {
          text: "Je recommande Money Minder à tous ceux qui veulent gérer leurs dépenses en groupe.",
          author: "Pierre Durand"
        },
      ],
    };
  },
};
</script>

<style scoped>

.testimonial-section {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

.testimonial-carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  justify-content: center;
}

.testimonial {
  flex: 0 0 auto;
  scroll-snap-align: start;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-right: 20px;
  max-width: 300px;
}

.author {
  font-style: italic;
  margin-top: 10px;
}

</style>
