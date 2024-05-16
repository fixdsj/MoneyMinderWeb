<template>
  <Bar
      id="my-chart-id"
      :data="chartData"
      :options="chartOptions"
      aria-label="Solde des dépenses du groupe"
  />
</template>

<script>
import {Bar} from 'vue-chartjs'
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: {Bar},
  data() {
    return {
      chartData: {
        labels: ['User 1', 'User 2', 'User 3', 'User 4', 'User 5', 'User 6'],
        datasets: [
          {
            label: 'Solde',
            data: [40, -20, 12, 50, -30, 45],
            backgroundColor: function (context) { // Utiliser une fonction pour définir la couleur de chaque barre en fonction du solde
              var value = context.dataset.data[context.dataIndex];
              return value >= 0 ? 'rgba(54, 162, 235, 0.5)' : 'rgba(255, 99, 132, 0.5)';
            },
            borderColor: function (context) { // Utiliser une fonction pour définir la couleur de bordure de chaque barre en fonction du solde
              var value = context.dataset.data[context.dataIndex];
              return value >= 0 ? 'rgba(54, 162, 235, 1)' : 'rgba(255, 99, 132, 1)';
            },
            borderWidth: 1
          },
        ]
      },
      chartOptions: {
        responsive: true,
        indexAxis: 'y',
        scales: {
          x: {
            grid: {
              display: false // Désactiver l'affichage de la grille pour l'axe x
            }
          },
          y: {
            grid: {
              display: false // Désactiver l'affichage de la grille pour l'axe y
            }
          }
        }
      }
    }
  }
}
</script>
