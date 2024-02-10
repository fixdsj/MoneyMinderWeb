<!--  <template>
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
      <div class="topbar">
        <ul>
          <li>Messages</li>
          <li>Dépenses</li>
          <li>Historique</li>
        </ul>
      </div>


        <div class="details">
          <h2>{{ groupeActif?.nom }}</h2>
          <p>{{ groupeActif?.description }}</p>
        </div>

    </div>
  </template>-->
<template>
  <div>
    <h1>Groupes</h1>
    <div class="maincontainer">
      <div class="sidebar">

        <ul>
          <li>Mes groupes</li>
          <li v-for="groupe in groupes" :key="groupe.id" @click="selectGroupe(groupe)"
              :class="{'groupeactif': groupeActif && groupe.id === groupeActif.id}">
            {{ groupe.nom }}
          </li>
        </ul>
      </div>

      <div class="contentcontainer">
        <nav class="topbar">
            <p class="tabmenu" @click="selectTab('messages')" :class="{ 'selectedtab': selectedTab === 'messages' }">Messages</p>
            <p class="tabmenu" @click="selectTab('depenses')"  :class="{ 'selectedtab': selectedTab === 'depenses' }">Dépenses</p>
            <p class="tabmenu" @click="selectTab('historique')" :class="{ 'selectedtab': selectedTab === 'historique' }">Historique</p>
        </nav>

        <div class="details">
          <h2>{{ groupeActif?.nom }}</h2>
          <p>{{ groupeActif?.description }}</p>

          <div v-if="selectedTab === 'messages'">
            <h3>Messages</h3>
            <ul>
              <li v-for="message in messages" :key="message.id">
                {{ message.message }}
              </li>
            </ul>
          </div>

          <div v-if="selectedTab === 'depenses'">
            <h3>Dépenses</h3>
            <ul>
              <li v-for="depense in depenses" :key="depense.id">
                {{ depense.montant }}
              </li>
            </ul>
          </div>

          <div v-if="selectedTab === 'historique'">
            <h3>Historique</h3>
            <ul>
              <li v-for="action in historique" :key="action.id">
                {{ action.action }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
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
        messages:[
          { id: 1, message: 'Message 1', destinataire: 'Groupe A'},
          { id: 2, message: 'Message 2', destinataire: 'Groupe B' },
          { id: 3, message: 'Message 3', destinataire: 'Groupe C' },
          { id: 4, message: 'Message 4', destinataire: 'Groupe D'}
        ],
        depenses:[
          { id: 1, montant: 100, destinataire: 'Maurice'},
          { id: 2, montant: 200, destinataire: 'Groupe B' },
          { id: 3, montant: 300, destinataire: 'Groupe C' },
          { id: 4, montant: 400, destinataire: 'Groupe D'}
        ],
        historique:[
          { id: 1, action: 'Remboursement soirée', type:'remboursement' ,date: '01/01/2021'},
          { id: 2, action: 'Action 2', type:'remboursement' ,date: '02/01/2021' },
          { id: 3, action: 'Action 3', type:'remboursement' , date: '03/01/2021' },
          { id: 4, action: 'Action 4', type:'remboursement' , date: '04/01/2021'}
        ],
        groupeActif: null,
        selectedTab: 'messages',
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
      selectTab(tab) {
        this.selectedTab = tab;
      },
    },
  };
  </script>

<style scoped>
.maincontainer {
  display: flex;
}
.contentcontainer {
  background-color: #5DADE2;
  flex-grow: 1;
}

.sidebar{
  display: flex;
  background-color: #f0f0f0;
  height: 70vh;
  overflow-y: auto;
  border-right: solid 2px #721c24;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  overflow-y: auto;
  border-bottom: solid 2px  #721c24;
}

.sidebar ul ul{
  list-style: none;
  padding: 0;
  text-decoration: none;
}

.sidebar  ul li{
  padding: 15px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
}


.sidebar ul li:hover{
  background-color: #ddd;
}
.sidebar a{
  padding: 10px;
  cursor: pointer;
  display: block;
  text-align: center;
  text-decoration: none;
  color: inherit;
}
.tabmenu{
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  padding: 15px;
  margin-right: 20px;
  display: block;
  text-align: center;
}

.details {
  flex-grow: 1;
  padding: 20px;
}
h1 {
  text-align: center;
  margin: 20px;
}
.groupeactif, .selectedtab {
  background-color: #ddd;
}
</style>
