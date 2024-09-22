import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        alias: '/home',
        name: 'home',
        component: () => import('@/components/pages/home/Home.vue')
    }, {
        path: '/auth',
        name: 'auth',
        component: () => import('@/components/pages/auth/Auth.vue')
    }, {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/components/pages/dashboard/Dashboard.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router