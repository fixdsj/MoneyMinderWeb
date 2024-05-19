<template>
  <div>
    <div v-if="hasNoRib" class="alert alert-info alert-dismissible fade show" role="alert">
      <strong>Users without RIB</strong> You can't pay this user because he doesn't have a RIB.
      <div class="my-auto">
        <button aria-label="Close" class="btn-close" data-bs-dismiss="alert" type="button"></button>
      </div>
    </div>
    <div class="container justify-content-evenly d-flex">
      <div class="col-md-5 text-md-center">
        <h3 class="text-center mb-4">Balance Overview</h3>
        <div class="mt-2 mx-2 bg-light rounded">
          <BarChart :activeGroupID="activeGroup.id"/>
        </div>
      </div>
      <hr class="d-md-none">
      <div class="col-md-5">
        <div v-if="paymentsToBeReceived.length" class="mb-2">
          <h3 class="text-center mb-4">They owe you
            <span
                class="badge bg-success rounded-pill">{{ paymentsToBeReceived.length }}</span></h3>
          <ul class="list-group">
            <li v-for="payment in paymentsToBeReceived" :key="payment.userName"
                class="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <p class="mb-0"><strong>{{ payment.userName }}</strong></p>
                <small>owes you</small>
              </div>
              <span class="badge bg-success rounded-pill">{{ payment.amountToPay }}€</span>
            </li>
          </ul>
        </div>
        <div v-else>
          <h3 class="text-center mb-4">They owe you <span class="badge bg-success rounded-pill">0</span></h3>
          <div class="alert alert-info" role="alert">
            No payment to receive for now.
          </div>
        </div>

        <div v-if="paymentsToBePaid.length">
          <h3 class="text-center mb-4 ">You owe <span class="badge bg-danger rounded-pill">{{
              paymentsToBePaid.length
            }}</span></h3>
          <p class="text-center text-secondary">Payments are optimized so that you only have to make one payment in the
            group.</p>
          <ul class="list-group">
            <li v-for="payment in paymentsToBePaid" :key="payment.userName"
                class="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <p class="mb-0"><strong>{{ payment.userName }}</strong></p>
                <small>you owe</small>
              </div>
              <span class="badge bg-danger rounded-pill">{{ payment.amountToPay }}€</span>
              <button class="btn btn-sm btn-primary" @click="paywithPaypal()">Paypal</button>
              <button v-if="waitingVirement === payment.id" class="btn btn-sm btn-secondary"
                      @click="confirmRibpayment(payment.idCurrentuser)">Confirm payment
              </button>
              <button v-else class="btn btn-sm btn-secondary" @click="downloadRib(payment.id)">RIB</button>

            </li>
          </ul>
        </div>
        <div v-else>
          <h3 class="text-center mb-4">You owe <span class="badge bg-danger rounded-pill">0</span></h3>
          <div class="alert alert-info" role="alert">
            No payment to make for now.
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
    async paywithPaypal() {
      console.log('Payer avec Paypal');
      try {
        const axios = require('axios');
        const response = await axios.post(process.env.VUE_APP_API_URL, {
          query: `mutation{payDuesToGroup(groupId: "${this.activeGroup.id}")}`
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
          },
        });
        const responseData = response.data;
        if (responseData.data && responseData.data.payDuesToGroup) {
          const paypalUrl = responseData.data.payDuesToGroup;
          window.open(paypalUrl, '_blank');
          await this.fetchPaymentToBePaid();
        }
      } catch (error) {
        console.error('Erreur lors du paiement', error);
      }
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
      console.log('Request to send: mutation{manuallyValidatePayment(groupId: "${this.activeGroup.id}",payerId: "${id}")}', this.activeGroup.id, id);
      const axios = require('axios');
      axios.post(process.env.VUE_APP_API_URL, {
        query: `mutation{manuallyValidatePayment(groupId: "${this.activeGroup.id}",payerId: "${id}")}`
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          "Accept": "application/json",
        },
      }).then(response => {
        const responseData = response.data;
        console.log('Réponse de la requête de validation de paiement', responseData);
        if (responseData.data && responseData.data.manuallyValidatePayment) {
          this.waitingVirement = null;
          this.fetchPaymentToBePaid();
        }
      }).catch(error => {
        console.error('Erreur lors de la validation du paiement', error);
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
          query: `{
  groupById(id: "${this.activeGroup.id}") {
    userGroups {
      user {
        id
        userName
      }
      payTo {
        amountToPay
        payToUser {
          id
          userName
        }
      }
    }
  }
}
`
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
          userGroups.map(userGroup => {
            if (userGroup.user.userName === this.currentUsername && userGroup.payTo.payToUser) {
              this.paymentsToBePaid.push({
                amountToPay: userGroup.payTo.amountToPay,
                idCurrentuser: userGroup.user.id,
                id: userGroup.payTo.payToUser.id,
                userName: userGroup.payTo.payToUser.userName,
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
  },
  watch: {
    activeGroup() {
      this.fetchPaymentToBeReceived();
      this.fetchPaymentToBePaid();
    }
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
