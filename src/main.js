import {createApp, provide, h} from 'vue';
import {DefaultApolloClient} from '@vue/apollo-composable';
import {ApolloClient, InMemoryCache, HttpLink} from "@apollo/client/core";
import App from './App.vue';
import router from './router/index.js';

//Import Bootstrap
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import 'bootstrap-icons/font/bootstrap-icons.css';

const cache = new InMemoryCache();


const apolloclient = new ApolloClient({
    cache,
    link: new HttpLink({
        uri: 'http://localhost:3000/graphql',
    }),
});

const app = createApp({
    setup() {
        provide(DefaultApolloClient, apolloclient);
    },
    render() {
        return h(App);
    }
});
app.use(router);

app.mount('#app');