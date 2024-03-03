<template>

  <div class="col-md-10 mx-auto col-lg-5 app-remboursement">
    <h3 class="text-center mb-4">Effectuer un remboursement</h3>
    <p>Vous devez 54€ au groupe actuel </p>
    <form @submit.prevent="createRemboursement">
      <div class="form-group">
        <label for="montant">Montant:</label>
        <input type="number" id="montant" class="form-control" v-model="remboursement.montant" v-bind:min="0"/>
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <input type="text" id="description" v-model="remboursement.description"/>
      </div>
      <button type="submit" class="w-100 btn btn-lg btn-primary">Effectuer le remboursement</button>
    </form>
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


.app-remboursement {
  max-width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>