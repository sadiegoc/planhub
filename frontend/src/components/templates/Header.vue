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
                <div class="user" v-if="user" @click.prevent="show = !show">
                    <i class="icon profile">
                        <img v-if="user.profile" :src="user.profile" alt="Profile">
                        <span v-else>{{ user.firstName[0] }}</span>
                    </i>
                    <div class="user-dropdown" :class="{ show }">
                        <div class="head">
                            <h5>Conta</h5>
                            <div class="account">
                                <i class="icon">
                                    <img v-if="user.profile" :src="user.profile" alt="Profile">
                                </i>
                                <div class="data">
                                    <p>{{ user.firstName }} {{ user.lastName }}</p>
                                    <p>{{ user.email }}</p>
                                </div>
                            </div>
                        </div>
                        <ul class="dropdown">
                            <li class="list-item">
                                <router-link :to="{ name: 'profile' }">
                                    Perfil
                                </router-link>
                            </li>
                        </ul>
                        <hr>
                        <ul class="dropdown">
                            <li class="list-item">
                                <router-link :to="{ name: 'dashboard' }">
                                    Dashboard
                                </router-link>
                            </li>
                            <li class="list-item">
                                <router-link :to="{ name: 'projects' }">
                                    Meus projetos
                                </router-link>
                            </li>
                            <li class="list-item">
                                <router-link :to="{ name: 'contacts' }">
                                    Contatos
                                </router-link>
                            </li>
                        </ul>
                        <hr>
                        <ul class="dropdown">
                            <li class="list-item">
                                <a href @click.prevent="logout">
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </div>
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
import Auth from '@/services/auth.service';

export default {
    name: 'HeaderTemplate',
    data: function () {
        return {
            show: false
        }
    },
    computed: mapState(['dark', 'user']),
    methods: {
        toggleTheme () {
            this.$store.commit('toggleTheme')
        },
        logout () {
            if (this.user.googleID) {
                Auth.logout().then(() => {
                    localStorage.clear()
                    this.$store.commit('setUser', null)
                    this.$router.push({ name: 'home' })
                })
                .catch(err => console.log(err))
            } else {
                localStorage.clear()
                this.$store.commit('setUser', null)
                this.$router.push({ name: 'home' })
            }
        }
    }
}
</script>

<style scoped>
header.dark .user-dropdown {
    border: 1px solid var(--black-soft);
    background-color: var(--black-half);
}
header .user-dropdown {
    border: 1px solid var(--white-soft);
    background-color: var(--white-half);
}

header.dark .dropdown li:hover, header.dark hr {
    background-color: var(--black-soft);
}

header .dropdown li:hover, header hr {
    background-color: var(--white-soft);
}

header .options .auth a:hover,
header .options i.icon:hover {
    background-color: var(--white-half);
}

header.dark .options .auth a:hover,
header.dark .options i.icon:hover {
    background-color: var(--black-half);
}

header {
    height: var(--header-h); width: 100%;
    display: flex; align-items: center;
}

.logo img { width: 35px; margin-right: 10px; }
.theme img { width: 22px; height: 22px; }
.profile img { border-radius: var(--border-r); }
.user i.icon.profile { padding: 0; margin-right: 5px; }
.theme, i.icon.profile, .profile img { width: 28px; height: 28px; }
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
    width: 100%; margin: 0 10px;
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


.user {
    position: relative;
}

.user-dropdown {
    width: 300px;

    padding: 5px 0; margin-top: 10px; display: none;
    position: absolute; right: 0;

    border-radius: var(--border-r);
}

.user-dropdown.show {
    display: block;
}

.dropdown {
    margin: 5px 0; padding: 0; width: 100%;

    display: flex; flex-direction: column;
    justify-content: center; align-items: flex-start;
}

.dropdown a, .dropdown li {
    display: flex; width: 100%;
}

.dropdown a {
    padding: 10px 20px; margin: 0;
}

.user-dropdown .head {
    display: flex; flex-direction: column;
    padding: 0 20px; margin: 10px 0;
}

.user-dropdown .account {
    display: flex; margin-top: 15px;
}

.user-dropdown h5 {
    text-transform: uppercase;
    font-weight: 600;
}

.user-dropdown .account .data {
    margin-left: 10px;
    display: flex; flex-direction: column;
    justify-content: space-between;

}

.user-dropdown .account p {
    font-size: 0.9rem;
}

.user-dropdown .account p:first-child {
    font-weight: 600;
}

.user-dropdown .account i.icon img {
    width: 50px; border-radius: var(--border-r);
}

hr {
    margin: auto;
    width: 100%; border: 0; height: 1px;
}
</style>