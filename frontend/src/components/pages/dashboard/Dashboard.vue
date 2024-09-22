<template>
    <article id="dashboard">
        dashboard
    </article>
</template>

<script>
import { userStorage } from '@/config/global';
import { jwtDecode } from 'jwt-decode';
import { mapState } from 'vuex';

export default {
    name: 'DashboardPage',
    computed: mapState(['user']),
    methods: {
        getCookie (name) {
            const value = `; ${document.cookie}`
            const parts = value.split(`; ${name}=`)
            if (parts.length === 2) return parts.pop().split(';').shift()
        }
    },
    mounted () {
        const token = this.getCookie('auth_token')
        if (token) {
            const userJwt = jwtDecode(token)
            localStorage.setItem(userStorage, JSON.stringify(userJwt))
            this.$store.commit('setUser', userJwt)
        } else {
            this.$router.push({ name: 'auth' })
        }
    }
}
</script>

<style scoped>

</style>