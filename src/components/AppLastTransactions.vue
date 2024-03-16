<template>

  <div class="accordion">
    <div v-for="transaction in transactions" :key="transaction.id" class="accordion-item">
      <h2 class="accordion-header">
        <button aria-controls="panelsStayOpen-collapse{{transaction.id}}" aria-expanded="true" class="accordion-button"
                data-bs-target="#panelsStayOpen-collapse{{transaction.id}}" data-bs-toggle="collapse"
                type="button">
          {{ transaction.author }} - {{ transaction.montant }}€ - {{ transaction.date }} -
          {{ formatType(transaction.type) }}&nbsp; <span class="badge bg-secondary"
                                                         style="text-transform: uppercase">{{
            transaction.categorie
          }}</span>
        </button>
      </h2>
      <div id="panelsStayOpen-collapse{{transaction.id}}" aria-labelledby="panelsStayOpen-heading{{transaction.id}}"
           class="accordion-collapse collapse show">
        <div class="accordion-body">
          Description: {{ transaction.description }}
          <div class="text-end">
            Télécharger le justificatif:
            <button class="btn"><i class="bi bi-file-earmark-arrow-down"></i></button>
          </div>
          Membres concernés: {{ transaction.membresconcernes.join(', ') }}

          <div class="text-end">
            Catégorie: {{ transaction.categorie }}
          </div>
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
          membresconcernes: ['Pierre', 'Paul', 'Jacques'],
          categorie: 'Sorties'
        },
        {
          author: 'Pierre',
          montant: 200,
          date: '05/12/2021',
          type: 'depense',
          description: 'Achat de matériel',
          membresconcernes: ['Pierre', 'Paul', 'Jacques'],
          categorie: 'Divers'
        },
        {
          author: 'Pierre',
          montant: 300,
          date: '18/04/2021',
          type: 'remboursement',
          description: 'Remboursement soirée',
          membresconcernes: ['Pierre', 'Paul', 'Jacques'],
          categorie: 'Sorties'
        },
        {
          author: 'Pierre',
          montant: 400,
          date: '13/09/2011',
          type: 'depense',
          description: 'Achat de matériel',
          membresconcernes: ['Pierre', 'Paul', 'Jacques'],
          categorie: 'Divers'
        },
      ],
    };
  },
  methods: {

    formatType(type) {
      // Mettez en majuscule la première lettre du type
      return type.charAt(0).toUpperCase() + type.slice(1);
    },
  },
};
</script>

<style scoped>

</style>
