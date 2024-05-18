<template>
  <div class="landingpage">
    <div class="p-3 p-md-5 mb-0 text-center">
      <div class="col-md-5 p-lg-5 mx-auto my-5">
        <h1 class="display-5 fw-bold">Simplifiez vos dépenses</h1>
        <p class="lead fw-normal">Simplifiez la gestion de vos dépenses et partagez facilement les frais avec vos
          proches grâce à Money Minder. Notre application intuitive vous permet de contrôler vos finances en toute
          simplicité.</p>
        <a v-if="!isLogged" class="btn btn-primary btn-lg px-4 gap-3" href="/register" type="button">Rejoignez-nous</a>
        <a v-if="isLogged" class="btn btn-primary btn-lg px-4 gap-3" href="/groups" type="button">Voir mes groupes</a>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <!-- Carousel -->
          <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner pb-2">
              <!-- Slide avec les témoignages -->
              <div class="carousel-item active" data-bs-interval="3000">
                <div class="testimonial-card">
                  <p class="testimonial-text">J'utilise Money Minder avec ma famille depuis des années. Cela me fait un
                    gain de temps (et d'argent) considérables.</p>
                  <p class="testimonial-author">Antoine Dupont - Twitter</p>
                </div>
              </div>
              <div class="carousel-item" data-bs-interval="3000">
                <div class="testimonial-card">
                  <p class="testimonial-text">Money Minder m'aide à gérer mes dépenses avec mes amis. C'est simple et
                    efficace.</p>
                  <p class="testimonial-author">Jean Martin - Instagram</p>
                </div>
              </div>
              <div class="carousel-item" data-bs-interval="3000">
                <div class="testimonial-card">
                  <p class="testimonial-text">Je recommande Money Minder à tous ceux qui veulent gérer leurs dépenses en
                    groupe.</p>
                  <p class="testimonial-author">Pierre Durand - Facebook</p>
                </div>
              </div>
            </div>
            <!-- Contrôles du carrousel -->
            <button class="carousel-control-prev" data-bs-slide="prev" data-bs-target="#carouselExampleControls"
                    type="button">
              <span aria-hidden="true" class="carousel-control-prev-icon"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" data-bs-slide="next" data-bs-target="#carouselExampleControls"
                    type="button">
              <span aria-hidden="true" class="carousel-control-next-icon"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Liens de téléchargement -->
    <div class="row justify-content-center mt-5 pb-2">
      <div class="col-md-8 text-center">
        <h2>Convaincu ?</h2>
        <p>Essaye notre site web ou télécharge l'application mobile</p>
        <div class="mt-4">
          <a class="btn btn-primary me-3" href="/register">
            <i class="bi bi-laptop"></i> Application Web
          </a>
          <a class="btn btn-primary" href="#">
            <i class="bi bi-phone"></i> Application Mobile
          </a>
        </div>
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
      isLogged: isLogged,
    };
  },
};
</script>

<style scoped>
.landingpage {
  background-color: var(--main-background-color);
  color: var(--first-text-color);
}

.testimonial-card {
  background-color: var(--main-background-color);
  border-radius: 10px;
  margin-bottom: 20px;
}

.testimonial-text {
  font-size: 18px;
}

.testimonial-author {
  font-size: 16px;
  font-style: italic;
}

</style>
