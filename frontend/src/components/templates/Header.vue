<template>
    <header id="header" class="bg-hard" :class="{ dark }">
        <div class="container">
            <div class="brand">
                <router-link :to="{ name: 'home' }">
                    <i class="icon logo">
                        <img src="@/assets/imgs/logo.png" alt="Logo">
                    </i>
                    Plan Hub
                </router-link>
            </div>
            <div class="options">
                <div class="auth" v-if="!user">
                    <router-link :to="{ name: 'auth' }">
                        Login / Sign Up
                    </router-link>
                </div>
                <div class="user" v-if="user">
                    <i class="icon profile">
                        <img v-if="user.profile" :src="user.profile" alt="Profile">
                        <span v-else>{{ user.firstName[0] }}</span>
                    </i>
                </div>
                <div class="theme">
                    <i class="icon theme" @click.prevent="toggleTheme">
                        <img v-if="dark" src="@/assets/imgs/icons/sun.png" alt="Light">
                        <img v-else src="@/assets/imgs/icons/moon.png" alt="Dark">
                    </i>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'HeaderTemplate',
    computed: mapState(['dark', 'user']),
    methods: {
        toggleTheme () {
            this.$store.commit('toggleTheme')
        }
    }
}
</script>

<style scoped>
header .options a:hover,
header .options i.icon:hover {
    background-color: var(--white-half);
}

header.dark .options a:hover,
header.dark .options i.icon:hover {
    background-color: var(--black-half);
}

header {
    height: var(--header-h); width: 100%;
    display: flex; align-items: center;
}

.logo img { width: 35px; margin-right: 10px; }
.theme img { width: 24px; height: 24px; }
.profile img { border-radius: var(--border-r); }
.user i.icon.profile { padding: 0; margin-right: 5px; }
.theme, i.icon.profile, .profile img { width: 35px; height: 35px; }
i.icon.profile span {
    width: 100%; height: 100%;
    
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 1.5rem;
    font-style: normal;
    color: white;
    
    background-color: var(--color-theme-1);
    border-radius: var(--border-r);
}

.brand a {
    font-weight: 600; font-size: 1.1rem;
    display: flex; align-items: center;
}

.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%; margin: 0 auto;
}

.options {
    display: flex; align-items: center;
}

.options a {
    font-size: 0.9rem;
}

.options a, .options i.icon {
    border-radius: var(--border-r);
}

.options a {
    padding: 10px; margin-right: 5px;
}

</style>