//import ref for global variables
import {createApp, h, ref} from 'vue';
import App from './App.vue';
import router from './router/index.js';

//Import Bootstrap
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import 'bootstrap-icons/font/bootstrap-icons.css';


//Import css personnalisé
import './custom.css';

export const isLogged = ref(false);
export const currentUsername = ref("Guest");


const app = createApp({
    render() {
        return h(App);
    }
});

/*app.use(GoogleAuth, {clientId:process.env.VUE_APP_GOOGLE_CLIENT_ID});*/
/*Vue.googleAuth().load()*/
app.use(router);
/*router.beforeEach((to, from, next) => {
    if (!isLogged.value && to.path !== '/login' && to.path !== '/register' && to.path !== '/privacy-policy' && to.path !== '/') next('/login')
    else next()
})*/

app.mount('#app');
