<template>

  <div class="col-md-10 mx-auto col-lg-5 app-remboursement">
    <h3 class="text-center mb-4">Payez une dépense</h3>
    <p class="text-md-center">Montant à rembourser pour le groupe : 3<i class="bi bi-currency-euro"></i></p>
    <button type="submit" @click="createRemboursement" class="btn btn-primary d-block mx-auto">Rembourser</button>
    <p class="text-md-center">Montant total à rembourser : 27<i class="bi bi-currency-euro"></i></p>
    <button type="submit" @click="createRemboursement" class="btn btn-primary d-block mx-auto">Rembourser le total
    </button>

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