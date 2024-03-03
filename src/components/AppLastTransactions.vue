<template>
  <div class="transaction-list">
    <ul>
      <li v-for="transaction in transactions" :key="transaction.id"
          :class="{ 'remboursement': transaction.type === 'remboursement', 'depense': transaction.type === 'depense' }">
        <div class="transaction-item">
          <p class="author">{{ transaction.author }}</p>
          <p :style="{ color: transaction.type === 'depense' ? 'red' : 'green' }" class="montant">{{
              transaction.montant
            }}</p>
          <p class="date">{{ formatDate(transaction.date) }}</p>
          <p class="type">{{ formatType(transaction.type) }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AppLastTransactions',
  data() {
    return {
      transactions: [
        {author: 'Pierre', montant: 100, date: '12:00 PM', type: 'remboursement'},
        {author: 'Pierre', montant: 200, date: '12:05 PM', type: 'depense'},
        {author: 'Pierre', montant: 300, date: '12:10 PM', type: 'remboursement'},
        {author: 'Pierre', montant: 400, date: '12:15 PM', type: 'depense'},
      ],
    };
  },
  methods: {
    formatDate(dateString) {
      // Vous pouvez utiliser une bibliothèque comme moment.js pour un formatage plus avancé
      return new Date(dateString).toLocaleTimeString();
    },
    formatType(type) {
      // Mettez en majuscule la première lettre du type
      return type.charAt(0).toUpperCase() + type.slice(1);
    },
  },
};
</script>

<style scoped>
.transaction-list {
  margin: 20px;
}

.transaction-list li {
  list-style-type: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
}

.transaction-item {
  padding: 15px;
}

.author {
  font-weight: bold;
  margin-bottom: 5px;
}

.montant {
  font-size: 24px;
  margin-bottom: 10px;
}

.date {
  color: #555;
  margin-bottom: 5px;
}

.type {
  text-transform: capitalize;
}

.remboursement {
  background-color: #d3f0d2;
}

.depense {
  background-color: #f8d7da;
}
</style>
