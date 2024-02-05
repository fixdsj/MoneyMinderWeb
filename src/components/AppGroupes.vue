  <template>
    <h1>Groupes</h1>
    <div class="containergroups">
        <div class="sidebar">
          <ul>
            <li v-for="groupe in groupes" :key="groupe.id" @click="selectGroupe(groupe)"
                :class="{'groupeactif': groupeActif && groupe.id === groupeActif.id}">
              {{ groupe.nom }}
            </li>
          </ul>
          <router-link to="/groupes/add">Ajouter un groupe</router-link>
        </div>
        <div class="details">
          <h2>{{ groupeActif?.nom }}</h2>
          <p>{{ groupeActif?.description }}</p>
        </div>
<!--      <div>
        <router-link to="/groupes/add">Ajouter un groupe</router-link>
      </div>-->
    </div>
  </template>

  <script>
  export default {
    name: 'VueGroupes',
    data() {
      return {
        groupes: [
          { id: 1, nom: 'Groupe A', description: 'Description du Groupe A' },
          { id: 2, nom: 'Groupe B', description: 'Description du Groupe B' },
          { id: 3, nom: 'Groupe C', description: 'Description du Groupe C' },
          { id: 4, nom: 'Groupe D', description: 'Description du Groupe D' },
        ],
        groupeActif: null,
      };
    },
    mounted() {
      // Sélection du premier groupe par défaut
      if (this.groupes.length > 0) {
        this.groupeActif = this.groupes[0];
      }
    },
    methods: {
      selectGroupe(groupe) {
        this.groupeActif = groupe;
      },
    },
  };
  </script>

<style scoped>
.containergroups {
  display: flex;
}
h1 {
  text-align: center;
}

.sidebar {
  width: 200px;
  background-color: #f0f0f0;
  height: 70vh;
  overflow-y: auto;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar ul li {
  padding: 10px;
  cursor: pointer;
  text-align: center;
}


.sidebar ul li:hover {
  background-color: #ddd;
}
.sidebar a {
  padding: 10px;
  cursor: pointer;
  display: block;
  text-align: center;
  text-decoration: none;
  color: inherit;
}

.details {
  flex-grow: 1;
  padding: 20px;
}
.groupeactif {
  background-color: #ddd;
}
</style>
