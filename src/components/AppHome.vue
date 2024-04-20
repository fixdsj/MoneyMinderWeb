<template>
  <div class="p-3 p-md-5  mb-0 text-center bg-light">
    <div class="col-md-5 p-lg-5 mx-auto my-5">
      <h1 class="display-5 fw-normaltext-body-emphasis">Simplifiez vos dépenses</h1>
      <p class="lead fw-normal">Simplifiez vos dépenses et gérer facilement les dépenses partagées avec vos amis et
        votre famille.</p>
      <a v-if="!isLogged" class="btn btn-secondary btn-lg px-4 gap-3" href="/register" type="button">S'inscrire</a>
      <a v-if="isLogged" class="btn btn-secondary btn-lg px-4 gap-3" href="/groups" type="button">Voir mes groupes</a>
    </div>
    <div class="product-device shadow-sm d-none d-md-block"></div>
    <!--    <div class="product-device product-device-2 shadow-sm d-none d-md-block"></div>-->
  </div>
  <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
    <path
        d="M0,160L15,149.3C30,139,60,117,90,90.7C120,64,150,32,180,48C210,64,240,128,270,133.3C300,139,330,85,360,64C390,43,420,53,450,69.3C480,85,510,107,540,128C570,149,600,171,630,202.7C660,235,690,277,720,250.7C750,224,780,128,810,85.3C840,43,870,53,900,64C930,75,960,85,990,117.3C1020,149,1050,203,1080,192C1110,181,1140,107,1170,117.3C1200,128,1230,224,1260,245.3C1290,267,1320,213,1350,202.7C1380,192,1410,224,1425,240L1440,256L1440,0L1425,0C1410,0,1380,0,1350,0C1320,0,1290,0,1260,0C1230,0,1200,0,1170,0C1140,0,1110,0,1080,0C1050,0,1020,0,990,0C960,0,930,0,900,0C870,0,840,0,810,0C780,0,750,0,720,0C690,0,660,0,630,0C600,0,570,0,540,0C510,0,480,0,450,0C420,0,390,0,360,0C330,0,300,0,270,0C240,0,210,0,180,0C150,0,120,0,90,0C60,0,30,0,15,0L0,0Z"
        fill="#f8f9fa"
        fill-opacity="1"></path>
  </svg>
  <div class="testimonial-section container-fluid">
    <div class="testimonial-carousel row justify-content-center">
      <div v-for="(testimonial, index) in testimonials" :key="index" class="testimonial col-lg-4 col-md-6">
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
  margin-bottom: 20px;
}

.testimonial-carousel {
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}

.testimonial {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-right: 20px;
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

@media (min-width: 900px) {
  .testimonial {
    max-width: 300px;
  }
}

</style>
