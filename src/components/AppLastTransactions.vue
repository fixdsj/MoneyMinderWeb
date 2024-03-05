<template>

  <div class="accordion" id="accordionPanelsStayOpenExample">
    <div v-for="transaction in transactions" :key="transaction.id" class="accordion-item">
      <h2 class="accordion-header" id="panelsStayOpen-heading{{transaction.id}}">
        <button class="accordion-button" type="button" data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapse{{transaction.id}}" aria-expanded="true"
                aria-controls="panelsStayOpen-collapse{{transaction.id}}">
          {{ transaction.author }} - {{ transaction.montant }}€ - {{ transaction.date }} -
          {{ formatType(transaction.type) }}
        </button>
      </h2>
      <div id="panelsStayOpen-collapse{{transaction.id}}" class="accordion-collapse collapse show"
           aria-labelledby="panelsStayOpen-heading{{transaction.id}}">
        <div class="accordion-body">
          Description: {{ transaction.description }}
          <div class="text-end">
            Télécharger le justificatif:
            <button class="btn"><i class="bi bi-file-earmark-arrow-down"></i></button>
          </div>
          Membres concernés: {{ transaction.membresconcernes.join(', ') }}
        </div>
      </div>
    </div>

  </div>

</template>

<script>
export default {
  name: 'AppLastTransactions',
  data() {
    return {
      transactions: [
        {
          author: 'Pierre',
          montant: 100,
          date: '12/03/2002',
          type: 'remboursement',
          description: 'Remboursement soirée',
          membresconcernes: ['Pierre', 'Paul', 'Jacques']
        },
        {
          author: 'Pierre',
          montant: 200,
          date: '05/12/2021',
          type: 'depense',
          description: 'Achat de matériel',
          membresconcernes: ['Pierre', 'Paul', 'Jacques']
        },
        {
          author: 'Pierre',
          montant: 300,
          date: '18/04/2021',
          type: 'remboursement',
          description: 'Remboursement soirée',
          membresconcernes: ['Pierre', 'Paul', 'Jacques']
        },
        {
          author: 'Pierre',
          montant: 400,
          date: '13/09/2011',
          type: 'depense',
          description: 'Achat de matériel',
          membresconcernes: ['Pierre', 'Paul', 'Jacques']
        },
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


.remboursement {
  background-color: #d3f0d2;
}

.depense {
  background-color: #f8d7da;
}
</style>
