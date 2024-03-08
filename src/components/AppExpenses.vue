<script>
export default {
  name: 'AppExpenses',
  data() {
    return {
      groupeactuel: [
        {id: 1, nom: "Dupond", prenom: 'Jean'},
        {id: 2, nom: "Durand", prenom: 'Pierre'},
        {id: 3, nom: "Martin", prenom: 'Paul'},
        {id: 4, nom: "Dujardin", prenom: 'Jean'},
      ],
      depense: {
        montant: 0,
        description: '',
        date: '',
        groupeusers: {},
      },
      justificatif: null,
    };
  },
  methods: {
    createDepense() {
      console.log('Créer une dépense');
    },
  },
};


</script>

<template>
  <div class="col-md-10 mx-auto col-lg-5 app-depenses">
    <h3 class="text-center mb-4">Créer une dépense</h3>
    <form @submit.prevent="createDepense">
      <div class="form-group mb-3">
        <label for="intitule">Intitulé:</label>
        <input type="text" id="description" class="form-control" v-model="depense.description"/>
        <small id="expenseHelp" class="form-text text-muted">Pour quel achat avez-vous dépensé?</small>
      </div>

      <div class="form-group mb-3">
        <label for="montant">Montant:</label>
        <input type="number" class="form-control" id="montant" v-model="depense.montant" v-bind:min="0"/>
      </div>

      <div class="form-group mb-3">
        <label for="proof">Justificatif:</label>
        <input type="file" class="form-control" id="proof"/>
      </div>

      <div class="form-group mb-3">
        <label for="categorie">Catégorie:</label>
        <select id="categorie" class="form-select">
          <option value="alimentation">Alimentation</option>
          <option value="sorties">Sorties</option>
          <option value="logement">Logement</option>
          <option value="transport">Transport</option>
          <option value="divers">Divers</option>
        </select>
      </div>

      <div class="form-group mb-3">
        <fieldset>
          <legend>Membres concernés:</legend>
          <div v-for="membre in groupeactuel" :key="membre.id">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" :id="membre.nom" :value="membre.nom"
                     v-model="depense.groupeusers[membre.nom]"/>
              <label class="form-check-label" :for="membre.nom">{{ membre.nom }}</label>
            </div>
          </div>
        </fieldset>
      </div>

      <button type="submit" class="btn btn-primary w-100">Créer la dépense</button>
    </form>
  </div>
</template>

<style scoped>
.app-depenses {
  max-width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

fieldset div {
  display: inline-block;
}
</style>