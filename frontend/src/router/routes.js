import { userStorage } from "@/config/global";
import { createRouter, createWebHistory } from "vue-router";

function getCookie (name) {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(';').shift()
}

const routes = [
    {
        path: '/',
        alias: '/home',
        name: 'home',
        component: () => import('@/components/pages/home/Home.vue'),
        meta: { requiresAuth: false }
    }, {
        path: '/auth',
        name: 'auth',
        component: () => import('@/components/pages/auth/Auth.vue'),
        meta: { requiresAuth: false }
    }, {
        path: '/auth/username',
        name: 'username',
        component: () => import('@/components/pages/auth/AuthUsername.vue')
    }, {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/components/pages/dashboard/Dashboard.vue'),
        meta: { requiresAuth: true }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userStorage)
    const token = getCookie('auth_token')
    
    if (to.matched.some(record => record.meta.requiresAuth === true)) {
        const user = JSON.parse(json) || token
        user ? next() : next({ name: 'auth' })
    } else if (to.matched.some(record => record.meta.requiresAuth === false)) {
        const user = JSON.parse(json)
        user ? next({ name: 'dashboard' }) : next()
    } else {
        next()
    }
})

export default router