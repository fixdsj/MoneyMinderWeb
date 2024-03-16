<template>
  <div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
    <div class="col-md-5 p-lg-5 mx-auto my-5">
      <h1 class="display-5 fw-normaltext-body-emphasis">Simplifiez vos dépenses</h1>
      <p class="lead fw-normal">Simplifiez vos dépenses et gérer facilement les dépenses partagées avec vos amis et
        votre famille.</p>
      <a v-if="!isLogged" class="btn btn-secondary btn-lg px-4 gap-3" href="/register" type="button">S'inscrire</a>
      <a v-if="isLogged" class="btn btn-secondary btn-lg px-4 gap-3" href="/groupes" type="button">Voir mes groupes</a>
    </div>
    <div class="product-device shadow-sm d-none d-md-block"></div>
    <div class="product-device product-device-2 shadow-sm d-none d-md-block"></div>
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
import {isLogged} from "@/main";

export default {
  name: 'AppHome',
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
      isLogged: isLogged,
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

.product-device {
  position: absolute;
  right: 10%;
  bottom: -30%;
  width: 300px;
  height: 540px;
  background-color: #333;
  border-radius: 21px;
  transform: rotate(30deg);
}

.product-device::before {
  position: absolute;
  top: 10%;
  right: 10px;
  bottom: 10%;
  left: 10px;
  content: "";
  background-color: rgba(255, 255, 255, .1);
  border-radius: 5px;
}

.product-device-2 {
  top: -25%;
  right: auto;
  bottom: 0;
  left: 5%;
  background-color: #e5e5e5;
}

.flex-equal > * {
  flex: 1;
}

@media (min-width: 900px) {
  .flex-md-equal > * {
    flex: 1;
  }
}


</style>
