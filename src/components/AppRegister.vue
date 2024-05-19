<template>
  <div class="col-md-10 mx-auto col-lg-5">
    <form class="p-4 p-md-5 border rounded-3" @submit="register">
      <h3 class="text-center mb-4">Register</h3>
      <p v-if="errors.length" class="text-danger">
        <b>Please correct the following error(s):</b>
        <ul class="mb-0 list-unstyled">
          <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
        </ul>
      </p>
      <div class="form-floating mb-3">
        <input id="pseudo" v-model="pseudo" class="form-control form-styling" placeholder="Pseudo" type="text">
        <label for="pseudo">Pseudo</label>
      </div>
      <div class="form-floating mb-3">
        <input id="email" v-model="email" class="form-control form-styling" placeholder="name@example.com" type="email">
        <label for="email">Email adress</label>
      </div>
      <small class="text-white">The password must contain at least 8 characters, a number, an uppercase letter and a
        lowercase letter.</small>
      <div class="form-floating mb-3 position-relative">
        <input id="password" v-model="password" :type="showPassword ? 'text' : 'password'"
               class="form-control pr-5 form-styling" placeholder="Password">
        <label for="password">Password</label>
        <button class="btn position-absolute end-0 translate-middle-y" style="top: 50%;" type="button"
                @click="toggleShowPassword">
          <i :class="showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'"></i>
        </button>

      </div>
      <div class="form-floating mb-3 position-relative">
        <input id="confirmPassword" v-model="confirmPassword" :type="showPassword ? 'text' : 'password'"
               class="form-control pr-5 form-styling" placeholder="Password">
        <label for="confirmPassword">Confirm password</label>
        <button class="btn position-absolute end-0 translate-middle-y" style="top: 50%;" type="button"
                @click="toggleShowPassword">
          <i :class="showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'"></i>
        </button>
      </div>
      <small class="text-white">By clicking on Register, you agree to the terms of use.</small>
      <button class="w-100 btn btn-lg btn-primary" type="submit">Register</button>
      <h4 class="text-center my-4 text-uppercase">Or</h4>
      <div class="d-grid mb-2">
        <a class="btn btn-google btn-login text-uppercase fw-bold" type="submit">
          <i class="bi bi-google me-2"></i> Register with Google
        </a>
        <i class="fab fa-google me-2"></i>
      </div>
    </form>
  </div>
</template>


<script>

export default {
  name: 'VueRegister',
  data() {
    return {
      pseudo: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: [],
      success: false,

      showPassword: false,
    };
  },

  methods: {

    async register(event) {
      event.preventDefault();
      if (this.password !== this.confirmPassword) {
        this.errors = ['Passwords do not match'];
        return;
      }
      console.log('Informations saisies :', this.pseudo, this.email, this.password);
      try {
        const axios = require('axios');
        const response = await axios.post('${process.env.VUE_APP_API_URL}', {
          query: `mutation CreateUser {
    createUser(
        appUserInsertDto: {
            userName: "${this.pseudo}"
            email: "${this.email}"
            password: "${this.password}"
            role: "User"
        }
    ) {
        id
        userName
        email
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
        console.log('Réponse:', responseData);
        if (responseData.errors) {
          this.errors = ['Erreur : ' + responseData.errors[0].message];

        }
        if (responseData.data.createUser !== null) {
          this.success = true;

          this.$router.push('/login');
        }
      } catch (e) {
        console.error(e);
        this.errors = ['An error occurred, please try again'];
      }
    },
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },
  },
};

</script>


<style scoped>
.btn-google {
  color: white !important;
  background-color: #ea4335;
}

.btn-google:hover {
  background-color: #d73e2b;
}

.form-styling {
  width: 100%;
  height: 35px;
  padding-left: 15px;
  border-radius: 25px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, .2);
}
</style>
