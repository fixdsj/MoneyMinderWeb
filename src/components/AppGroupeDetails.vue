<script>
export default {
  name: 'AppGroupeDetails',
  data() {
    return {
      groupe: {
        nom: 'Groupe A',
        description: 'Description du Groupe A',
        membres: [
          {id: 1, nom: 'Pierre', prenom: 'Durand', email: 'exafemple@example.com', lasttransaction: '12/03/2002'},
          {id: 2, nom: 'Paul', prenom: 'Dupond', email: 'examfeple2@example.com', lasttransaction: '05/12/2021'},
          {id: 3, nom: 'Jacques', prenom: 'Martin', email: 'exampfefle3@example.com', lasttransaction: '18/04/2021'},
          {id: 4, nom: 'Jean', prenom: 'Dujardin', email: 'example3ED@example.com  ', lasttransaction: '13/09/2011'},
        ],
      },
    };
  },
};

</script>

<template>
  <table class="table">
    <thead>
    <tr>
      <th scope="col">Prénom</th>
      <th scope="col">Nom</th>
      <th scope="col">Email</th>
      <th scope="col">Dernière transaction</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="membre in groupe.membres" :key="membre.id">
      <td>{{ membre.prenom }}</td>
      <td>{{ membre.nom }}</td>
      <td>{{ membre.email }}</td>
      <td>{{ membre.lasttransaction }}</td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>