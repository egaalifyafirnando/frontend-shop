import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

// DEFINE ROUTES
const routes = [
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/auth/Register.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/auth/Login.vue'),
    },
    {
        path: '/customer/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/Index.vue'),

        // CHECK IS LOGGED_IN
        meta: {
            requiresAuth: true,
        },
    },
];

// CREATE ROUTER
const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

// DEFINE ROUTE FOR HANDLE AUTHENTICATION
router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        // CHECK VALUE FROM GETTERS "IS_LOGGED_IN" IN MODULE AUTH
        if (store.getters['auth/isLoggedIn']) {
            next();
            return;
        }
        next();
        return;
    } else {
        next();
    }
});

export default router;
