<template>
    <article id="auth" class="bg-hard" :class="{ dark }">
        <div class="container">
            <form @submit.prevent="submit">
                <fieldset>
                    <legend v-if="isLogin">Login</legend>
                    <legend v-else>Sign Up</legend>
                    <p v-if="msg">{{ msg }}</p>
                    <input type="text" v-if="!isLogin" v-model="user.firstName" placeholder="Nome">
                    <input type="text" v-if="!isLogin" v-model="user.lastName" placeholder="Sobrenome">
                    <input type="text" v-if="!isLogin" v-model="user.username" placeholder="Nome de usuário">
                    <input type="email" v-model="user.email" placeholder="E-mail">
                    <input type="password" v-model="user.password" placeholder="Senha">
                    <input type="password" v-if="!isLogin" v-model="user.confirmPassword" placeholder="Confirmar senha">
                    <button type="submit" class="btn-enter">
                        Enter
                    </button>
                    <button @click.prevent="authGoogle" class="btn-google">
                        <img src="@/assets/imgs/icons/google.png">
                        Sign in with Google
                    </button>
                    <p v-if="isLogin">
                        Already a member?
                        <a @click="isLogin = !isLogin">Sign In</a>
                    </p>
                    <p v-else>
                        Don't have an account?
                        <a @click="isLogin = !isLogin">Sign Up for free</a>
                    </p>
                </fieldset>
            </form>
        </div>
    </article>
</template>

<script>
import { userStorage } from '@/config/global';
import Auth from '@/services/auth.service';
import { mapState } from 'vuex';

export default {
    name: 'AuthPage',
    computed: mapState(['dark']),
    data: function () {
        return {
            user: {},
            isLogin: false,
            msg: ""
        }
    },
    methods: {
        submit () {
            this.isLogin ? this.login() : this.register()
        },
        login () {
            Auth.login(this.user)
                .then(res => {
                    this.$store.commit('setUser', res.data)
                    localStorage.setItem(userStorage, JSON.stringify(res.data))
                    this.$router.push({ name: 'dashboard', query: { method: 'auth' } })
                })
                .catch(err => console.log(err))
        },
        register () {
            Auth.register(this.user)
                .then(() => this.isLogin = !this.isLogin)
                .catch(err => console.log(err))
        },
        async authGoogle () {
            await Auth.authGoogle()
        }
    }
}
</script>

<style scoped>
article.dark form { border-color: var(--black-half); }
article form { border-color: var(--white-half); }

article.dark fieldset input,
article.dark fieldset { border-color: var(--black-half); }
article fieldset input,
article fieldset { border-color: var(--white-half); }

article {
    width: 100%; height: calc(100vh - var(--header-h) - var(--footer-h));
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%; height: 100%;
}

form {
    margin: 0 20px;
}

form, fieldset {
    max-width: 500px; width: 100%;
    display: flex; flex-direction: column;
    justify-content: center; align-items: center;
}

fieldset {
    padding: 15px;
    border: 1px groove;
    border-radius: 5px;
}

fieldset legend {
    font-size: 1.4rem;
    padding: 0 10px;
}

fieldset *:not(:last-child) {
    margin-bottom: 15px;
}

fieldset input {
    outline: none; font-size: 0.9rem;
    background: transparent;
    border: 1px solid; border-radius: 5px;
    padding: 10px 15px; width: 100%;
}

fieldset button {
    cursor: pointer;
    border: none; border-radius: 5px;
    width: 100%; height: 35px;

    display: flex;
    align-items: center;
    justify-content: center;
}

fieldset button:active {
    transform: scale(98%);
}

fieldset .btn-enter {
    background-color: var(--color-theme-1);
    color: white;
    font-weight: 600;
}

fieldset .btn-enter:hover {
    background-color: var(--color-theme-2);
}

fieldset .btn-google {
    color: #444; font-weight: 600;
    background-color: #fff;
    border: 1px solid #ccc;
}

.btn-google img {
    margin-right: 15px; width: 16px;
}

fieldset p {
    font-size: 0.8rem;
}

fieldset p a {
    font-weight: 600;
    cursor: pointer;
}
</style>