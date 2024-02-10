import { createRouter,createWebHistory } from 'vue-router';
import Groupes from "../components/AppGroupes.vue";
import Home from "../components/AppHome.vue";
import Account from "../components/AppAccount.vue";


const routes =
    [
    { path: '/', component: Home },
    { path: '/groupes', component: Groupes },
    { path: '/account', component: Account }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
