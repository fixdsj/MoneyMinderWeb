<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-5 app-remboursement">
        <h3 class="text-center mb-4">Payez une dépense</h3>

        <p class="text-center">Montant à rembourser pour le groupe : 3<i class="bi bi-currency-euro"></i></p>
        <button type="button" @click="createRemboursement(3)" class="btn btn-primary w-100">
          Rembourser 3€
        </button>

        <p class="text-center mt-4">Montant total à rembourser : 27<i class="bi bi-currency-euro"></i></p>
        <button type="button" @click="createRemboursement(27)" class="btn btn-primary w-100">
          Rembourser le total
        </button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'AppRefunds',
  data() {
    return {
      depense: {
        montant: 0,
        description: '',
        date: '',
        groupeusers: {},
      },
      remboursement: {
        montant: 0,
        description: '',
      },
    };
  },
  methods: {
    createRemboursement() {
      console.log('Effectuer un remboursement');
    },
  },
};

</script>


<style scoped>


</style>