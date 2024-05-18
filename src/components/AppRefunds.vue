<template>
  <div>
    <div v-if="hasNoRib" class="alert alert-info alert-dismissible fade show" role="alert">
      <strong>L'utilisateur n'a pas de RIB enregistré.</strong> Il doit enregistrer un RIB pour pouvoir recevoir des
      remboursements.
      <div class="my-auto">
        <button aria-label="Close" class="btn-close" data-bs-dismiss="alert" type="button"></button>
      </div>
    </div>
    <div class="container justify-content-evenly d-flex">
      <div class="col-md-5 text-md-center">
        <div class="mt-2 mx-2 bg-light rounded">
          <BarChart :activeGroupID="activeGroup.id"/>
        </div>
        <h3 class="text-center mb-4">Paiement rapide</h3>
        <p class="text-center mt-1">Vous devez rembourser 27<i class="bi bi-currency-euro"></i> à votre groupe</p>
        <p class="text-center mt-4">Montant total à rembourser : 27<i class="bi bi-currency-euro"></i></p>
        <button class="btn btn-primary justify-content-center" type="button" @click="paidDue">
          Payer 10€ au groupe {{ activeGroup.name }}
        </button>
      </div>
      <hr class="d-md-none">
      <div class="col-md-5">
        <div v-if="paymentsToBeReceived.length" class="mb-2">
          <h3 class="text-center mb-4">Ils vous doivent <span
              class="badge bg-success rounded-pill">{{ paymentsToBeReceived.length }}</span></h3>
          <ul class="list-group">
            <li v-for="payment in paymentsToBeReceived" :key="payment.userName"
                class="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <p class="mb-0"><strong>{{ payment.userName }}</strong></p>
                <small>doit vous rembourser</small>
              </div>
              <span class="badge bg-success rounded-pill">{{ payment.amountToPay }}€</span>
            </li>
          </ul>
        </div>
        <div v-else>
          <h3 class="text-center mb-4">Ils vous doivent <span class="badge bg-success rounded-pill">0</span></h3>
          <div class="alert alert-info" role="alert">
            Aucun paiement à recevoir pour le moment.
          </div>
        </div>

        <div v-if="paymentsToBePaid.length">
          <h3 class="text-center mb-4 ">Vous devez <span class="badge bg-danger rounded-pill">{{
              paymentsToBePaid.length
            }}</span></h3>
          <div class="d-flex justify-content-evenly">
            <button class="btn btn-sm btn-primary" @click="paywithPaypal(activeGroup.id)">Payer au groupe avec Paypal
            </button>
            <button v-if="waitingVirement === activeGroup.id" class="btn btn-sm btn-secondary"
                    @click="confirmRibpayment(activeGroup.id)">Confirmer le virement
            </button>
            <button v-else class="btn btn-sm btn-secondary" @click="payforGroup(activeGroup.id)">J'ai payé au groupe
              d'un autre façon
            </button>
          </div>
          <ul class="list-group">
            <li v-for="payment in paymentsToBePaid" :key="payment.userName"
                class="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <p class="mb-0"><strong>{{ payment.userName }}</strong></p>
                <small>vous devez rembourser</small>
              </div>
              <span class="badge bg-danger rounded-pill">{{ payment.amountToPay }}€</span>
              <button class="btn btn-sm btn-primary" @click="paywithPaypal(payment.id)">Paypal</button>
              <button v-if="waitingVirement === payment.id" class="btn btn-sm btn-secondary"
                      @click="confirmRibpayment(payment.id)">Confirmer le virement
              </button>
              <button v-else class="btn btn-sm btn-secondary" @click="downloadRib(payment.id)">RIB</button>

            </li>
          </ul>
        </div>
        <div v-else>
          <h3 class="text-center mb-4">Vous devez <span class="badge bg-danger rounded-pill">0</span></h3>
          <div class="alert alert-info" role="alert">
            Aucun paiement à effectuer pour le moment.
          </div>
        </div>
      </div>

    </div>
  </div>
</template>


<script>
import BarChart from "@/components/BalanceChart.vue";
import {currentUsername} from "@/main";

export default {
  name: 'AppRefunds',
  props: {
    activeGroup: Object,
  },
  watch: {
    activeGroup() {
      this.fetchPaymentToBeReceived();
      this.fetchPaymentToBePaid();
    }
  },
  components: {BarChart},
  data() {
    return {
      groupExpenses: [],
      userExpenses: [],
      hasNoRib: false,
      waitingVirement: null,
      paymentsToBeReceived: [],
      paymentsToBePaid: [],

      currentUsername: currentUsername,
    };
  },
  methods: {
    paywithPaypal(id) {
      console.log('Payer avec Paypal à l user id:', id);
    },
    async downloadRib(id) {
      console.log('Payer avec RIB à l user id:', id);
      //On vérifie si l'utilisateur a un RIB avant de le télécharger
      const axios = require('axios');
      axios.post(process.env.VUE_APP_API_URL, {
        query: `{userById(id: "${id}"){ribExtension}}`
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          "Accept": "application/json",
        },
      }).then(response => {
        const responseData = response.data;
        if (responseData.data && responseData.data.userById) {
          const ribExtension = responseData.data.userById.ribExtension;
          if (ribExtension) {
            this.waitingVirement = id;
            axios.post(process.env.VUE_APP_API_URL, {
              query: `mutation {
  userRib(ribUserId: "${id}")
}`
            }, {
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
              },
            }).then(response => {
              const responseData = response.data;
              console.log('Réponse de la requête de RIB', responseData);
              if (responseData.data && responseData.data.userRib) {
                const ribUrl = responseData.data.userRib;
                console.log('Téléchargement du RIB', ribUrl)
                axios.get(ribUrl, {
                  responseType: 'blob',
                }).then(response => {
                  const url = window.URL.createObjectURL(new Blob([response.data]));
                  const link = document.createElement('a');
                  link.href = url;
                  link.setAttribute('download', `rib.${ribExtension}`);
                  document.body.appendChild(link);
                  link.click();
                }).catch(error => {
                  console.error('Erreur lors du téléchargement du RIB', error);
                });
              }
            }).catch(error => {
              console.error('Erreur lors de la récupération du RIB', error);
            });
          } else {
            this.hasNoRib = true;
          }
        }
      }).catch(error => {
        console.error('Erreur lors de la récupération du RIB', error);
      });
    },
    confirmRibpayment(id) {
      console.log('Confirmer le virement à l user id:', id);
    },
    payforGroup(id) {
      console.log('Payer pour le groupe id:', id);
    },
    async paidDue() {
      console.log('Payer une dette');
    },
    formatDate(isoDate) {
      const date = new Date(isoDate);
      return date.toLocaleString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      });
    },
    async fetchPaymentToBeReceived() {
      try {
        const axios = require('axios');
        const response = await axios.post(process.env.VUE_APP_API_URL, {
          query: `{
            currentUser {
              paymentsToBeReceived {
                amountToPay
                userGroup {
                  user {
                    userName
                  }
                }
              }
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
          this.paymentsToBeReceived = responseData.data.currentUser.paymentsToBeReceived.map(payment => {
            return {
              amountToPay: payment.amountToPay,
              userName: payment.userGroup.user.userName,
            };
          });
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des paiements à recevoir', error);
      }
    },
    async fetchPaymentToBePaid() {
      try {
        const axios = require('axios');
        const response = await axios.post(process.env.VUE_APP_API_URL, {
          query: `query {
        groupById(id: "${this.activeGroup.id}") {
          userGroups {
            user {
              userName
              id
              userGroups {
                payTo {
                  amountToPay
                  payToUser {
                    userName
                    id
                  }
                }
              }
            }
          }
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
          const userGroups = responseData.data.groupById.userGroups;
          this.paymentsToBePaid = [];

          userGroups.forEach(userGroup => {
            if (userGroup.user.userName === this.currentUsername) {
              userGroup.user.userGroups.forEach(group => {
                if (group.payTo && group.payTo.payToUser) {
                  this.paymentsToBePaid.push({
                    amountToPay: group.payTo.amountToPay,
                    userName: group.payTo.payToUser.userName,
                    id: group.payTo.payToUser.id,
                  });
                }
              });
            }
          });
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des paiements à effectuer', error);
      }
    }
  },
  mounted() {
    this.fetchPaymentToBeReceived();
    this.fetchPaymentToBePaid();
  }
};
</script>

<style scoped>
.list-group-item {
  margin-top: 10px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: var(--main-background-color);
}
</style>
