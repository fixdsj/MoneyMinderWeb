
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
            <p class="tabmenu" @click="selectTab('depenses')"  :class="{ 'selectedtab': selectedTab === 'depenses' }">Dépenses/Remboursements</p>
            <p class="tabmenu" @click="selectTab('historique')" :class="{ 'selectedtab': selectedTab === 'historique' }">Historique</p>
        </nav>

        <div class="details">
          <h2>{{ groupeActif?.nom }}</h2>
          <p>{{ groupeActif?.description }}</p>

          <div v-if="selectedTab === 'messages'">
            <h3>Messages</h3>
            <AppChat />
          </div>

          <div v-if="selectedTab === 'depenses'">
            <h3>Dépenses</h3>
            <AppTransactions />
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
  import AppChat from "@/components/AppChat.vue";
  import AppTransactions from "@/components/Apptransactions.vue";
  export default {
    name: 'VueGroupes',
    components: {AppTransactions, AppChat},
    data() {
      return {
        groupes: [
          { id: 1, nom: 'Groupe A', description: 'Description du Groupe A' },
          { id: 2, nom: 'Groupe B', description: 'Description du Groupe B' },
          { id: 3, nom: 'Groupe C', description: 'Description du Groupe C' },
          { id: 4, nom: 'Groupe D', description: 'Description du Groupe D' },
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
  background-color: #d6e1ea;
  flex-grow: 1;
}

.sidebar{
  display: flex;
  background-color: #f0f0f0;
  height: 70vh;
  overflow-y: auto;
}

.topbar {
  display: flex;
  background-color: #f0f0f0;
  justify-content: space-between;
  text-decoration: none;
  overflow-y: auto;
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
  padding: 10px; /* Adjust as needed */
  margin-right: 15px;
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
.groupeactif{
  background-color: #ddd;
  border-right: solid 2px #721c24;
}
.selectedtab {
  background-color: #ddd;
  border-bottom: solid 2px  #721c24;
}
</style>
