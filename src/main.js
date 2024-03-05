//import ref for global variables
import {createApp, h, ref} from 'vue';
import App from './App.vue';
import router from './router/index.js';

//Import Bootstrap
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import 'bootstrap-icons/font/bootstrap-icons.css';


export const isLogged = ref(false);
export const currentUsername = ref("Guest");

const app = createApp({
    render() {
        return h(App);
    }
});
app.use(router);

app.mount('#app');