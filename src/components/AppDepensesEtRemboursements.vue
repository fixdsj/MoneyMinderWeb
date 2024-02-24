<template>
  <div class="depensesetremboursementcontainer">
    <div class="app-depenses">
      <h1>Créer une dépense</h1>
      <p>Faire un checkbox pour cocher quelle personne est concernée par la dépense</p>
      <form @submit.prevent="createDepense">
        <div class="form-group">
          <label for="montant">Montant:</label>
          <input type="number" id="montant" v-model="depense.montant" v-bind:min="0" />
        </div>
        <div class="form-group">
          <label for="description">Description:</label>
          <input type="text" id="description" v-model="depense.description" />
        </div>
        <div class="form-group">
          <label for="membreconcernes">Date de la dépense:</label>
          <input type="date" id="date" v-model="groupeactuel.date" />
        </div>
        <div class="form-group">
          <label for="membreconcernes">Membres concernés:</label>
          <input type="text" id="membreconcernes" v-model="groupeactuel.nom" />
        </div>
        <div class="form-group">
          <fieldset>
            <legend>Choisir les membres concernés:</legend>
            <div v-for="membre in groupeactuel" :key="membre.id">
              <input type="checkbox" :id="membre.nom" :value="membre.nom" v-model="depense.groupeusers[membre.nom]" />
              <label :for="membre.nom">{{ membre.nom }}</label>
            </div>
          </fieldset>
        </div>
        <button type="submit">Créer la dépense</button>
      </form>
    </div>
    <div class="app-remboursement">
      <h1>Effectuer un remboursement</h1>
      <p>Vous devez 54€ au groupe actuel </p>
      <form @submit.prevent="createRemboursement">
        <div class="form-group">
          <label for="montant">Montant:</label>
          <input type="number" id="montant" v-model="remboursement.montant" v-bind:min="0" />
        </div>
        <div class="form-group">
          <label for="description">Description:</label>
          <input type="text" id="description" v-model="remboursement.description" />
        </div>
        <button type="submit">Effectuer le remboursement</button>
      </form>
    </div>
  </div>
</template>

<script >
export default {
  name: 'AppDepensesEtRemboursements',
  data() {
    return {
      notifications:[
        { id: 1, message: 'Vous devez 54€ au groupe actuel', date: '01/01/2021' },
        { id: 2, message: 'Vous devez 54€ au groupe actuel', date: '01/01/2021' },
        { id: 3, message: 'Vous devez 54€ au groupe actuel', date: '01/01/2021' },
        { id: 4, message: 'Vous devez 54€ au groupe actuel', date: '01/01/2021' },
      ],
      groupeactuel: [
        { id: 1, nom: "Dupond", prenom: 'Jean' },
        { id: 2, nom: "Durand", prenom: 'Pierre' },
        { id: 3, nom: "Martin", prenom: 'Paul' },
        { id: 4, nom: "Dujardin", prenom: 'Jean' },
      ],
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
    createDepense() {
      console.log('Créer une dépense');
    },
    createRemboursement() {
      console.log('Effectuer un remboursement');
    },
  },
};

</script>



<style scoped>
.depensesetremboursementcontainer{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.app-depenses, .app-remboursement{
  background-image: linear-gradient(120deg, #d6e1ea 0%, #ffffff 100%);
  max-width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.app-depenses:focus-within{
  background-color: red;
}
.app-remboursement:focus-within {
  background-color: green;
}
.depensesetremboursementcontainer h1{
  text-align: center;
  border-bottom: solid 2px #ccc;
  margin-bottom: 10px;
}
.depensesetremboursementcontainer button[type="submit"] {
  width: 100%;
  margin-top: 15px;
  padding: 0.75rem;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.depensesetremboursementcontainer button[type="submit"]:hover {
  background-color: #0056b3;
}

.depensesetremboursementcontainer input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.depensesetremboursementcontainer select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.depensesetremboursementcontainer label {
  display: block;
  margin: 5px;
}
legend{
  text-align: center;
}
fieldset div{
  display: inline-block;
}

</style>