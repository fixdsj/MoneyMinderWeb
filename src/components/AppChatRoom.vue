<template>
  <div class="chat-area ">
    <!-- chatlist -->
    <div class="chatlist m-2">
      <div class="modal-dialog-scrollable">
        <div class="modal-content">
          <div class="chat-header">
            <div class="input-group">
              <input aria-label="search" class="form-control" placeholder="Rechercher" type="text">
              <button class="btn btn-outline-secondary" type="button"><i class="bi bi-search"></i></button>
            </div>

            <ul id="myTab" class="nav nav-tabs" role="tablist">
              <li class="nav-item" role="presentation">
                <button id="Open-tab" aria-controls="Open" aria-selected="true" class="nav-link active"
                        data-bs-target="#Open" data-bs-toggle="tab" role="tab" type="button">Amis
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button id="Closed-tab" aria-controls="Closed" aria-selected="false" class="nav-link"
                        data-bs-target="#Closed" data-bs-toggle="tab" role="tab" type="button"
                        @click="fetchCurrentUserGroups">Groupes
                </button>
              </li>
            </ul>
          </div>

          <div class="modal-body overflow-x-hidden">
            <!-- chat-list -->
            <div class="chat-lists">
              <div id="myTabContent" class="tab-content">

                <!--                        Amis-->
                <div id="Open" aria-labelledby="Open-tab" class="tab-pane fade show active " role="tabpanel">
                  <!-- chat-list -->
                  <div class="chat-list">

                    <div v-for="friend in friends" :key="friend.name">
                      <a class="d-flex align-items-center "
                         role="button"
                         @click="handleCurrentChat('friend',friend)">
                        <div class="flex-shrink-0">
                          <img
                              :src="friend.avatarUrl ? friend.avatarUrl : 'https://api.dicebear.com/8.x/initials/svg?seed=' + friend.name"
                              alt="user img"
                              class="img-fluid img-thumbnail rounded-circle"
                              style="width: 50px; height: 50px;">
                        </div>
                        <div class="flex-grow-1 ms-3">
                          <h3>{{ friend.name }}</h3>
                          <p class="text-truncate">{{ friend.email }}</p>
                        </div>
                      </a>
                      <hr class="m-0 p-0 mb-2">
                    </div>

                  </div>
                  <!-- chat-list -->
                </div>
                <!--                        Groupes-->
                <div id="Closed" aria-labelledby="Closed-tab" class="tab-pane fade" role="tabpanel">
                  <!-- chat-list -->
                  <div class="chat-list">
                    <a v-for="group in groups" :key="group.name" class="d-flex align-items-center" role="button"
                       @click="handleCurrentChat('group',group)">
                      <div class="flex-shrink-0">
                        <img
                            :src="group.groupImageUrl ? group.groupImageUrl : 'https://api.dicebear.com/8.x/initials/svg?seed=' + group.name"
                            alt="user img"
                            class="img-fluid img-thumbnail rounded-circle"
                            style="width: 50px; height: 50px;">
                      </div>
                      <div class="flex-grow-1 ms-3">
                        <h3>{{ group.name }}</h3>
                        <p class="text-truncate">{{ group.description }}</p>
                      </div>
                    </a>
                    <a v-if="groups.length === 0" class="d-flex align-items-center" href="/account">
                      <div class="flex-grow-1 ms-3">
                        <h3>Aucun groupe</h3>
                      </div>
                    </a>
                  </div>
                  <!-- chat-list -->
                </div>
              </div>

            </div>
            <!-- chat-list -->
          </div>
        </div>
      </div>
    </div>
    <!-- chatlist -->
    <!-- chatbox -->
    <div class="chatbox">
      <div class="modal-dialog-scrollable">
        <div class="modal-content">
          <div class="msg-head">
            <div class="row">
              <div class="col-8">
                <div class="d-flex align-items-center">
                  <div class="flex-shrink-0">
                    <img
                        :src="activeChat.avatarUrl ? activeChat.avatarUrl : 'https://api.dicebear.com/8.x/initials/svg?seed=' + activeChat.name"
                        alt="user img"
                        class="img-fluid img-thumbnail rounded-circle"
                        style="width: 50px; height: 50px;">
                  </div>
                  <div class="flex-shrink-0">
                  </div>
                  <div class="flex-grow-1 ms-3">
                    <h3>{{ activeChat.name }}</h3>
                    <p>{{ activeChat.email }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-body">
            <div class="msg-body">
              <ul ref="messageList">
                <li v-for="message in activeChat.messages" :key="message.id"
                    :class="{'sender': message.sender.userName !== this.currentUsername, 'repaly': message.sender.userName === this.currentUsername}">
                  <p>{{ message.content }}</p>
                  <span class="time">{{ message.sentAt }}</span>
                </li>
              </ul>
            </div>
          </div>


          <div class="send-box">
            <form @submit.prevent="sendMessage">
              <input v-model="messageToSend" aria-label="message" class="form-control"
                     placeholder="Ecrire un message…"
                     type="text">
              <button aria-hidden="true" class="btn btn-primary w-25 mx-1" type="button" @click="sendMessage">Envoyer
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {currentUsername} from "@/main";

export default {
  name: 'AppChatRoom',
  data() {
    return {
      messageToSend: '',
      groups: [],
      friends: [],
      activeChat: [],
      currentUsername: currentUsername,
      activeTab: 'friends',
    };
  },
  methods: {
    handleCurrentChat(place, chat) {
      this.activeChat = chat;
      if (place === 'group') {
        this.fetchCurrentGroupChat(chat.id);
        this.activeTab = 'groups'
      } else if (place === 'friend') {
        this.fetchCurrentFriendChat(chat.id);
        this.activeTab = 'friends'
      }
    },
    async fetchCurrentFriendChat() {

      const axios = require('axios');
      try {
        const response = await axios.post(`${process.env.VUE_APP_API_URL}`, {
          query: `{messagesByOtherUserId(otherUserId: "${this.activeChat.id}"){sender{userName},receiver{userName}, content ,sentAt}}
`
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
          },
        });
        const responseData = response.data;

        if (responseData.data.messagesByOtherUserId.length > 0) {
          this.activeChat.messages = responseData.data.messagesByOtherUserId.map((message) => {
            return {
              sender: message.sender,
              receiver: message.receiver,
              content: message.content,
              sentAt: new Date(message.sentAt).toLocaleTimeString('fr-FR', {
                weekday: "long",
                month: "long",
                day: "numeric",
                hour: '2-digit',
                minute: '2-digit',
              }),
            };
          });
          const messageList = this.$refs.messageList;
          messageList.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});

        }
      } catch (error) {
        console.error('Erreur:', error);
      }
    },
    async fetchCurrentGroupChat() {

      const axios = require('axios');
      try {
        const response = await axios.post('${process.env.VUE_APP_API_URL', {
          query: `{groupById(id: "${this.activeChat.id}"){receivedGroupMessages{sender{userName},content,sentAt}}}`
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
          },
        });
        const responseData = response.data.data;
        if (responseData.groupById.receivedGroupMessages) {
          this.activeChat.messages = responseData.groupById.receivedGroupMessages.map((message) => {
            return {
              sender: message.sender,
              receiver: message.receiver,
              content: message.content,
              sentAt: new Date(message.sentAt).toLocaleTimeString('fr-FR', {
                weekday: "long",
                month: "long",
                day: "numeric",
                hour: '2-digit',
                minute: '2-digit',
              }),
            };
          });
        }
      } catch (error) {
        console.error('Erreur:', error);
      }
    },
    async fetchCurrentUserFriends() {
      try {
        const axios = require('axios');
        const response = await axios.post('${process.env.VUE_APP_API_URL}', {
          query: `{users{userName,id,email,avatarUrl}}`
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
          },
        });
        const responseData = response.data;
        if (responseData.data.users.length > 0) {
          this.friends = responseData.data.users.map((user) => {
            return {
              name: user.userName,
              id: user.id,
              email: user.email,
              avatarUrl: user.avatarUrl,
            };
          }).filter((friend) => friend.name !== this.currentUsername);
          this.activeChat = this.friends[0];
          await this.fetchCurrentFriendChat();
        }
      } catch (error) {
        console.error('Erreur:', error);
      }
    },
    async fetchCurrentUserGroups() {
      try {
        const axios = require('axios');
        const response = await axios.post('${process.env.VUE_APP_API_URL}', {
          query: `{currentUser{userGroups{group{name,id,description, groupImageUrl}}}}`
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
          },
        });
        const responseData = response.data;
        if (responseData.data.currentUser.userGroups.length > 0) {
          this.groups = responseData.data.currentUser.userGroups.map((groupe) => {
            return {
              name: groupe.group.name,
              id: groupe.group.id,
              description: groupe.group.description,
              groupImageUrl: groupe.group.groupImageUrl,
            };
          });
        }
      } catch (error) {
        console.error('Erreur:', error);
      }
    },
    async sendMessage() {
      if (this.messageToSend === '') return;

      if (this.activeTab === 'friends') {
        await this.sendMessageToFriend();
      } else if (this.activeTab === 'groups') {
        await this.sendMessageToGroup();
      }

    },
    async sendMessageToFriend() {
      const axios = require('axios');
      try {
        const response = await axios.post('${process.env.VUE_APP_API_URL}', {
          query: `mutation {
  sendMessage(messageInsertInput: { receiverId: "${this.activeChat.id}", content: "${this.messageToSend}" }) {
    content, sentAt
  }
}`
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
          },
        });
        const responseData = response.data;

        if (responseData.data) {
          await this.fetchCurrentFriendChat();
          this.messageToSend = '';
        }
      } catch (error) {
        console.error('Erreur:', error);
      }
    },

    async sendMessageToGroup() {
      const axios = require('axios');
      try {
        const response = await axios.post('${process.env.VUE_APP_API_URL}', {
          query: `mutation {
  sendGroupMessage(groupMessageInsertInput:  { groupId: "${this.activeChat.id}" , content: "${this.messageToSend}" }) {
    content
  }
}`
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
          },
        });
        const responseData = response.data;

        if (responseData.data) {
          await this.fetchCurrentGroupChat();
          this.messageToSend = '';
        }
      } catch (error) {
        console.error('Erreur:', error);
      }
    },
    async sucribeToNewMessages() {
      const axios = require('axios');
      try {
        const response = await axios.post('${process.env.VUE_APP_API_URL}', {
          query: `subscription{messageAdded{content,sender{userName},receiver{userName}, sentAt}}`
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
          },
        });
        const responseData = response.data;
        if (responseData.data) {
          console.log('response data:', responseData);
          this.activeChat.messages.push({
            sender: responseData.data.messageAdded.sender,
            receiver: responseData.data.messageAdded.receiver,
            content: responseData.data.messageAdded.content,
            sentAt: new Date(responseData.data.messageAdded.sentAt).toLocaleTimeString('fr-FR', {
              weekday: "long",
              month: "long",
              day: "numeric",
              hour: '2-digit',
              minute: '2-digit',
            }),
          });
          const messageList = this.$refs.messageList;
          messageList.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
        }

      } catch (error) {
        console.error('Erreur:', error);
      }
    }
  },
  mounted() {
    this.fetchCurrentUserFriends();
  },
};

</script>

<style scoped>

.modal-body {
  padding: 5px;
}


.chat-area {
  position: relative;
  width: 100%;
  border-radius: 0.3rem;
  height: 90vh;
  overflow: hidden;
  min-height: calc(100% - 1rem);
}

.chatlist {
  outline: 0;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  width: 300px;
  float: left;
  /*padding: 15px;*/
}

.chat-area .modal-content {
  border: none;
  border-radius: 0;
  outline: 0;
  height: 100%;
}

.chat-area .modal-dialog-scrollable {
  height: 100% !important;
}

.chatbox {
  width: auto;
  overflow: hidden;
  height: 100%;
  border-left: 1px solid #ccc;
}

.chatbox,
.chatlist {
  max-width: 100%;
  margin: 0;
}


.chat-area .form-control {
  display: block;
  width: 80%;
  padding: 0.375rem 0.75rem;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  color: #222;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ccc;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0.25rem;
  transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}

.chat-area .form-control:focus {
  outline: 0;
  box-shadow: inherit;
}

a.add img {
  height: 36px;
}

.chat-area .nav-tabs {
  border-bottom: 1px solid #dee2e6;
  align-items: center;
  justify-content: space-between;
  flex-wrap: inherit;
}

.chat-area .nav-tabs .nav-item {
  width: 100%;
}

.chat-area .nav-tabs .nav-link {
  width: 100%;
  color: #180660;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  text-transform: capitalize;
  margin-top: 5px;
  margin-bottom: -1px;
  background: 0 0;
  border: 1px solid transparent;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
}

.chat-area .nav-tabs .nav-item.show .nav-link,
.chat-area .nav-tabs .nav-link.active {
  color: #222;
  background-color: #fff;
  border-color: transparent transparent #000;
}

.chat-area .nav-tabs .nav-link:focus,
.chat-area .nav-tabs .nav-link:hover {
  border-color: transparent transparent #000;
  isolation: isolate;
}

.chat-list h3 {
  color: #222;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  margin-bottom: 0;
}

.chat-list p {
  color: #343434;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  text-transform: capitalize;
  margin-bottom: 0;
}

.chat-list a.d-flex {
  margin-bottom: 15px;
  position: relative;
  text-decoration: none;
}


.msg-head h3 {
  color: #222;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.5;
  margin-bottom: 0;
}

.msg-head i {
  font-size: 2.3em;
}

.msg-head p {
  color: #343434;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  text-transform: capitalize;
  margin-bottom: 0;
}

.msg-head {
  padding: 15px;
  border-bottom: 1px solid #ccc;
}

.msg-body ul {
  overflow: hidden;
}

.msg-body ul li {
  list-style: none;
  margin: 15px 0;
}

.msg-body ul li.sender {
  display: block;
  width: 100%;
  position: relative;
}

.msg-body ul li.sender:before {
  display: block;
  clear: both;
  content: '';
  position: absolute;
  top: -6px;
  left: -7px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 12px 15px 12px;
  border-color: transparent transparent var(--second-button-color) transparent;
  -ms-transform: rotate(-37deg);
  transform: rotate(-37deg);
}

.msg-body ul li.sender p {
  color: #000;
  font-size: 14px;
  line-height: 1.5;
  font-weight: 400;
  padding: 15px;
  background: var(--second-button-color);
  display: inline-block;
  border-bottom-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  margin-bottom: 0;
}

.msg-body ul li.sender p b {
  display: block;
  color: #180660;
  font-size: 14px;
  line-height: 1.5;
  font-weight: 500;
}

.msg-body ul li.repaly {
  display: block;
  width: 100%;
  text-align: right;
  position: relative;
}

.msg-body ul li.repaly:before {
  display: block;
  clear: both;
  content: '';
  position: absolute;
  bottom: 15px;
  right: -7px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 12px 15px 12px;
  border-color: transparent transparent var(--button-color) transparent;
  -ms-transform: rotate(37deg);
  transform: rotate(37deg);
}

.msg-body ul li.repaly p {
  color: #fff;
  font-size: 14px;
  line-height: 1.5;
  font-weight: 400;
  padding: 15px;
  background: var(--button-color);
  display: inline-block;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  margin-bottom: 0;
}

.msg-body ul li.repaly p b {
  display: block;
  color: #061061;
  font-size: 14px;
  line-height: 1.5;
  font-weight: 500;
}

.msg-body ul li.repaly:after {
  display: block;
  content: '';
  clear: both;
}

.time {
  display: block;
  color: #000;
  font-size: 12px;
  line-height: 1.5;
  font-weight: 400;
}

li.repaly .time {
  margin-right: 20px;
}

.divider {
  position: relative;
  z-index: 1;
  text-align: center;
}

.msg-body h6 {
  text-align: center;
  font-weight: normal;
  font-size: 14px;
  line-height: 1.5;
  color: #222;
  background: #fff;
  display: inline-block;
  padding: 0 5px;
  margin-bottom: 0;
}

.divider:after {
  display: block;
  content: '';
  clear: both;
  position: absolute;
  top: 12px;
  left: 0;
  border-top: 1px solid #EBEBEB;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.send-box {
  padding: 15px;
  border-top: 1px solid #ccc;
}

.send-box form {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}

.send-box .form-control {
  display: block;
  width: 85%;
  padding: 0.375rem 0.75rem;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  color: #222;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ccc;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0.25rem;
  transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}


.add-apoint a {
  text-decoration: none;
  background: #F6F7FA;
  border-radius: 8px;
  padding: 8px 8px;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.2;
  color: #343945;
}

.add-apoint a svg {
  margin-right: 5px;
}


.closess i {
  display: none;
}


@media (max-width: 767px) {

  .chatlist {
    width: 100%;
  }

  .chatbox {
    width: 100%;
    position: absolute;
    left: 1000px;
    right: 0;
    background: #fff;
    transition: all 0.5s ease;
    border-left: none;
  }

  .msg-head h3 {
    font-size: 14px;
  }

  .msg-head p {
    font-size: 12px;
  }

  .msg-head .flex-shrink-0 img {
    height: 30px;
  }

  .send-box button {
    width: 28%;
  }

  .send-box .form-control {
    width: 70%;
  }

  .chat-list h3 {
    font-size: 14px;
  }

  .chat-list p {
    font-size: 12px;
  }

  .msg-body ul li.sender p {
    font-size: 13px;
    padding: 8px;
    border-bottom-left-radius: 6px;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }

  .msg-body ul li.repaly p {
    font-size: 13px;
    padding: 8px;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    border-bottom-left-radius: 6px;
  }
}

.nav-link.active {
  background-color: var(--third-background-color) !important;
  color: white !important;
}

.form-control[aria-label="search"] {
  background-color: var(--second-background-color);
}

.form-control[aria-label="message"] {
  background-color: var(--second-background-color);
}

.img-thumbnail {
  background-color: var(--second-background-color);
}

/*Custom Scrollbar*/
::-webkit-scrollbar {
  width: 8px;

}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 8px;
}

</style>