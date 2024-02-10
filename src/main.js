import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import auth from './store/auth.js';

const app = createApp(App);

app.use(router);
app.use(auth)

app.mount('#app');