<template>
  <div class="chat-container">
    <h1>Chat</h1>
    <ul class="message-list">
      <li v-for="message in messages" :key="message.id" :class="{ 'user-message': message.isCurrentUser, 'other-user-message': !message.isCurrentUser }">
        <div class="message-info">
          <p class="author">{{ message.author }}</p>
          <p class="time">{{ message.time }}</p>
        </div>
        <p class="text">{{ message.text }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AppChat',
  data() {
    return {
      messages: [
        { text: 'Message 1', author: 'Maurice', time: '12:00 PM', isCurrentUser: false },
        { text: 'Message 2', author: 'Groupe B', time: '12:05 PM', isCurrentUser: true },
        { text: 'Message 3', author: 'Groupe C', time: '12:10 PM', isCurrentUser: false },
        { text: 'Message 4', author: 'Groupe D', time: '12:15 PM', isCurrentUser: false },
      ],
    };
  },
};
</script>
<style scoped>
.chat-container {
  margin:  auto;
}

.message-list {
 display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  margin: 0;
}

.message-list li {
  /*max-width: 600px;*/
  border-radius: 12px;
  margin-bottom: 16px;
  padding: 15px 20px 15px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.user-message {
  background-color: #6cb2eb;
  color: #fff;
  align-self: flex-end;
}

.other-user-message {
  background-color: #f0f0f0;
  color: #333;
  align-self: flex-start;
}

.message-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.author {
  font-weight: bold;
  margin-right: 8px;
}

.text {
  margin: 0;
}

.time {
  color: #888;
}

h1 {
  text-align: center;
  color: #333;
}
</style>