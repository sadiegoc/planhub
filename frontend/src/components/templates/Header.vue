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
                <div class="auth">
                    <router-link :to="{ name: 'auth' }">
                        Login / Sign Up
                    </router-link>
                </div>
                <div class="theme">
                    <i class="icon theme" @click.prevent="this.$store.state.dark = !this.$store.state.dark">
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
    computed: mapState(['dark'])
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
.theme img { width: 17px; height: 17px; }
.theme i.icon { cursor: pointer; }

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
    padding: 10px;
    border-radius: var(--border-r);
}

</style>