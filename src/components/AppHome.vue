<template>
  <div class="app-home">
<!--  <AppCarousel />-->
    <div class="atterissagediv">
      <h1>Simplifiez vos dépenses</h1>
      <p>Gérez facilement les dépenses partagées avec vos amis et votre famille.</p>
      <router-link to="/register" >Inscrivez-vous</router-link>
    </div>
    <div class="testimonial-section">
      <div class="testimonial-carousel">
        <div v-for="(testimonial, index) in testimonials" :key="index" class="testimonial">
          <p>{{ testimonial.text }}</p>
          <p class="author">{{ testimonial.author }}</p>
        </div>
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
        { text: "J'utilise Money Minder avec ma famille depuis des années. Cela me fait un gain de temps (et d'argent) considérables.", author: "Antoine Dupont" },
        { text: "Money Minder m'aide à gérer mes dépenses avec mes amis. C'est simple et efficace.", author: "Jean Martin" },
        { text: "Je recommande Money Minder à tous ceux qui veulent gérer leurs dépenses en groupe.", author: "Pierre Durand" },
      ],
    };
  },
};
</script>

<style scoped>
.atterissagediv{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60vh;
  background-color: inherit;
  color: #6E6E6E;
}
.atterissagediv h1{
  font-size: 2.5rem;
  margin-bottom: 20px;
}
.atterissagediv p{
  font-size: 1.5rem;
  margin-bottom: 20px;
}
.atterissagediv a{
  width: 200px;
  padding: 0.75rem;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s;
  text-decoration: none;
}


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
