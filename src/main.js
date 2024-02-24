import { createApp, provide, h } from 'vue';
import {DefaultApolloClient} from '@vue/apollo-composable';
import {ApolloClient, InMemoryCache, HttpLink} from "@apollo/client/core";
import App from './App.vue';
import router from './router/index.js';

const cache = new InMemoryCache();
/*const apolloclient = new ApolloClient({
    cache,
  uri: 'http://localhost:3000/graphql',

});*/

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