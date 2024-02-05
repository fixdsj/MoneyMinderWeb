import { createApp } from 'vue';
import App from './App.vue';


const app = createApp(App);

// Define a global property
app.config.globalProperties.$websitetitle = 'Money Minder';
app.config.globalProperties.$color1 = '#f3f3f3';



app.mount('#app');
