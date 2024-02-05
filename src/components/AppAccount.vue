<template>
  <div class="app-account">
    <div class="mes-groupes">
      <h2>Mes groupes</h2>
        <ul>
          <li v-for="groupe in groupes" :key="groupe.id" class="groupes-list" >
            {{ groupe.nom }}
          </li>
        </ul>
        <!-- TODO ajouter d'autres champs-->
        <button >Nouveau groupe</button>

    </div>
    
    <div class="mes-informations">
      <h2>Mes informations</h2>
      <form @submit.prevent="updateCompte">
        <div class="form-group">
          <label for="prenom">Prénom:</label>
          <input type="text" id="prenom" v-model="utilisateur.prenom" />
        </div>
        <div class="form-group">
          <label for="nom">Nom:</label>
          <input type="text" id="nom" v-model="utilisateur.nom" />
        </div>

        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="utilisateur.email" />
        </div>
        <!-- TODO ajouter d'autres champs-->
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppAccount',
  data() {
    return {
      utilisateur: {
        prenom: 'Robert',
        nom: 'Durand',
        email: 'robert.durand@gmail.com',
      },
      groupes: [
        { id: 1, nom: 'Groupe A', description: 'Description du Groupe A' },
        { id: 2, nom: 'Groupe B', description: 'Description du Groupe B' },
        { id: 3, nom: 'Groupe C', description: 'Description du Groupe C' },
        { id: 4, nom: 'Groupe D', description: 'Description du Groupe D' },
      ],
    };
  },
  methods: {
    updateCompte() {
      console.log('Informations mises à jour:', this.utilisateur);

    },
  },
};
</script>
<style scoped>
.app-account {
  display: flex;
  background-color: var(--main-background-color);
}
.mes-informations, .mes-groupes{
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  background-color: #fff;
}

h2 {
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
}
.groupes-list {
  padding: 0.5rem;
  border-bottom: 1px solid #eaeaea;
  transition: background-color 0.3s;
  text-align: center;
  text-decoration: none;
  list-style-type: none;
}

.form-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: #666;
}

.form-group input {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #007bff;
}

button[type="submit"], .mes-groupes button{
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}
</style>
