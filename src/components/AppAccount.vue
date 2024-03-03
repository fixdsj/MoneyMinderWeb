<template>
  <div class="app-account">
    <div class="mes-groupes">
      <h2>Mes groupes</h2>
      <ul>
        <li v-for="groupe in groupes" :key="groupe.id" class="groupes-list">
          {{ groupe.nom }}
          <img class="deletebutton" src="../assets/delete_button.png">
        </li>
      </ul>
      <button class="nouveaugroupe" type="submit" @click="toggleInput" :class="{ 'openinput': inputOpen }">Nouveau
        groupe
      </button>
      <form @submit.prevent="createGroupe" v-if="inputOpen">
        <input type="text" style="margin-top: 10px"
               placeholder="Saisir le nom du groupe et appuyer sur Entrée pour envoyer"/>
        <button type="submit">Créer</button>
      </form>
    </div>

    <div class="mes-informations">
      <h2>Mes informations</h2>
      <form @submit.prevent="updateCompte">
        <div class="form-group">
          <div class="profile-picture-container">
            <img v-if="profilePictureURL" :src="profilePictureURL" alt="Profile Picture"/>
            <div v-else class="default-profile-icon" @click="openFileInput">
              <img src="../assets/profile_icon.png" alt="Uploader une photo">
            </div>
          </div>
          <input type="file" id="profile-picture" @change="handleProfilePictureChange" ref="fileInput"
                 style="display: none"/>
        </div>
        <div class="form-group">
          <label for="prenom">Prénom:</label>
          <input type="text" id="prenom" v-model="utilisateur.prenom"/>
        </div>
        <div class="form-group">
          <label for="nom">Nom:</label>
          <input type="text" id="nom" v-model="utilisateur.nom"/>
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="utilisateur.email"/>
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
        {id: 1, nom: 'Groupe A', description: 'Description du Groupe A'},
        {id: 2, nom: 'Groupe B', description: 'Description du Groupe B'},
        {id: 3, nom: 'Groupe C', description: 'Description du Groupe C'},
        {id: 4, nom: 'Groupe D', description: 'Description du Groupe D'},
      ],
      inputOpen: false,
      profilePictureURL: null,
    };
  },
  methods: {
    updateCompte() {
      console.log('Informations mises à jour:', this.utilisateur);
    },
    toggleInput() {
      this.inputOpen = !this.inputOpen;
      console.log("le menu est ouvert" + this.inputOpen);
    },
    createGroupe() {
      console.log('Créer un groupe');
      this.inputOpen = !this.inputOpen;
    },
    handleProfilePictureChange(event) {
      const file = event.target.files[0];
      if (file) {
        // Handle the file, for example, you can store it in a data property
        this.profilePicture = file;
        this.profilePictureURL = URL.createObjectURL(file);
        console.log('Profile picture selected:', this.profilePictureURL);
      }
    },
    openFileInput() {
      this.$refs.fileInput.click();
    },
  },
};
</script>

<style scoped>
.app-account {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  min-height: 100%;

}

.mes-groupes, .mes-informations {
  background-image: linear-gradient(120deg, #d6e1ea 0%, #ffffff 100%);
  max-width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 50%;
  margin-top: 10px;
  margin-bottom: 20px;
}

.app-account h2, .mes-informations h2 {
  text-align: center;
}

.app-account button[type="submit"], .nouveaugroupe button {
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

.app-account button[type="submit"]:hover, .nouveaugroupe button:hover {
  background-color: #0056b3;
}

.app-account input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.app-account select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.app-account label {
  display: block;
  margin: 5px;
}

.mes-groupes li {
  padding: 15px;
  cursor: pointer;
  text-align: center;
  list-style-type: none;
}

.deletebutton {
  width: 20px;
  height: 20px;
  padding-top: 5px;
  background: none;
}

.openinput {
  display: block;
}

.profile-picture-container {
  display: flex;
  justify-content: center;
  cursor: pointer;
}

.profile-picture-container img {
  width: 75px;
  height: 75px;
}

</style>