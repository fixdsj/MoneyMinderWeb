<template>
  <Bar v-if="isLoaded"
       id="balance-chart"
       :data="chartData"
       :options="chartOptions"
       aria-label="Balance of group expenses"
  />
</template>

<script>
import {Bar} from 'vue-chartjs'
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ChartDataLabels)

export default {
  name: 'BarChart',
  props: {
    activeGroupID: String
  },
  components: {Bar},
  data() {
    return {
      isLoaded: false,
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Solde',
            data: [],
            backgroundColor: function (context) {
              var value = context.dataset.data[context.dataIndex];
              return value >= 0 ? 'rgba(75, 192, 192, 0.5)' : 'rgba(255, 99, 132, 0.5)';
            },
            borderColor: function (context) {
              var value = context.dataset.data[context.dataIndex];
              return value >= 0 ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)';
            },
            borderWidth: 1,
            borderRadius: 4,
          },
        ]
      },
      chartOptions: {
        responsive: true,
        indexAxis: 'y',
        plugins: {
          datalabels: {
            align: 'end',
            anchor: 'end',
            formatter: function (value) {
              return value.toFixed(2) + ' €';
            },
            color: '#333',
            font: {
              weight: 'bold',
              size: 14,
            }
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return `${tooltipItem.dataset.label}: ${tooltipItem.raw.toFixed(2)} €`;
              }
            }
          },
          legend: {
            display: false
          },
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              callback: function (value) {
                return value + ' €';
              },
              font: {
                size: 12,
                weight: 'bold',
              }
            }
          },
          y: {
            grid: {
              display: false
            },
            ticks: {
              font: {
                size: 14,
                weight: 'bold',
              }
            }
          }
        }
      }
    }
  },
  methods: {
    async fetchBalanceInGroup() {
      try {
        const axios = require('axios');
        const response = await axios.post('${process.env.VUE_APP_API_URL}', {
          query: `query {
  groupBalances(groupId: "${this.activeGroupID}") {
    key
    value
  }
}
`
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });

        const responseData = response.data;
        if (responseData.data && responseData.data.groupBalances) {
          const groupBalances = responseData.data.groupBalances;
          this.chartData.datasets[0].data = groupBalances.map(balance => balance.value);
          this.chartData.labels = groupBalances.map(balance => {
            return this.userGroups.find(userGroup => userGroup.user.id === balance.key).user.userName;
          });


          this.isLoaded = true;
        }

      } catch (error) {
        console.error('Erreur:', error);
      }
    },
    async fetchUsersInGroup() {
      try {
        const axios = require('axios');
        const response = await axios.post('${process.env.VUE_APP_API_URL}', {
          query: `query {
  groupById(id: "${this.activeGroupID}") {
    userGroups {
      user {
        id
        userName
      }
    }
  }
}      `
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });

        const responseData = response.data;
        if (responseData.data && responseData.data.groupById) {
          this.userGroups = responseData.data.groupById.userGroups;
        }

      } catch (error) {
        console.error('Erreur:', error);
      }
    }

  },
  mounted() {
    this.fetchUsersInGroup().then(() => {
      this.fetchBalanceInGroup();
    });
  },
  watch: {
    activeGroupID() {
      this.fetchUsersInGroup().then(() => {
        this.fetchBalanceInGroup();
      });
    }
  }
}
</script>

<style scoped>
</style>
