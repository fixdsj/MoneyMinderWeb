import {createRouter, createWebHistory} from 'vue-router';
import Groupes from "../components/AppGroupes.vue";
import Home from "../components/AppHome.vue";
import Account from "../components/AppAccount.vue";
import AppLogin from "@/components/AppLogin.vue";
import AppRegister from "@/components/AppRegister.vue";
import AppError404 from "@/components/AppError404.vue";

const routes =
    [
        {path: '/', component: Home},
        {path: '/groupes', component: Groupes},
        {path: '/account', component: Account},
        {path: '/login', component: AppLogin},
        {path: '/register', component: AppRegister},
        {path: '/:notFound(.*)', component: AppError404}

    ];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
