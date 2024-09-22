<template>
    <article id="auth" :class="{ dark }">
        <div class="container">
            <form @submit.prevent="submit">
                <fieldset>
                    <legend v-if="isLogin">Login</legend>
                    <legend v-else>Sign Up</legend>
                    <input type="text" v-if="!isLogin" v-model="user.firstName" @input="validateFirstName" placeholder="Nome">
                    <input type="text" v-if="!isLogin" v-model="user.lastName" @input="validateLastName" placeholder="Sobrenome">
                    <input type="text" v-if="!isLogin" v-model="user.username" @input="validateUsername" placeholder="Nome de usuário">
                    <input type="email" v-model="user.email" placeholder="E-mail">
                    <input type="password" v-model="user.password" placeholder="Senha">
                    <input type="password" v-if="!isLogin" v-model="user.confirmPassword" placeholder="Confirmar senha">
                    
                    <div class="err">
                        <p v-if="serverMsg" class="msg">{{ serverMsg }}</p>
                        <p v-if="usernameErrChar" class="msg">{{ usernameErrChar }}</p>
                        <p v-if="usernameErrLength" class="msg">{{ usernameErrLength }}</p>
                        <p v-if="firstNameErrLength" class="msg">{{ firstNameErrLength }}</p>
                        <p v-if="lastNameErrLength" class="msg">{{ lastNameErrLength }}</p>
                    </div>
                    
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
            serverMsg: "",
            usernameErrChar: "",
            usernameErrLength: "",
            firstNameErrLength: "",
            lastNameErrLength: ""
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
                    this.$router.push({ name: 'dashboard' })
                    this.reset()
                })
                .catch(err => {
                    this.serverMsg = err.response.data
                })
        },
        register () {
            Auth.register(this.user)
                .then(() => {
                    this.isLogin = !this.isLogin
                    this.reset()
                })
                .catch(err => {
                    this.serverMsg = err.response.data
                })
        },
        async authGoogle () {
            await Auth.authGoogle()
        },
        validateFirstName () {
            if (this.user.firstName.length < 3 || this.user.firstName.length > 16) {
                this.firstNameErrLength = "O nome deve ter entre 3 e 16 caracteres."
            } else this.firstNameErrLength = ""
        },
        validateLastName () {
            if (this.user.lastName.length < 2 || this.user.lastName.length > 16) {
                this.lastNameErrLength = "O sobrenome deve ter entre 2 e 16 caracteres."
            } else this.lastNameErrLength = ""
        },
        validateUsername () {
            const regex = /^[a-zA-Z0-9._!@]+$/
            if (this.user.username && !regex.test(this.user.username)) {
                this.usernameErrChar = "O username só pode conter letras, números, ., _, ! ou @."
            } else this.usernameErrChar = ""

            if (this.user.username.length < 5 || this.user.username > 16) {
                this.usernameErrLength = "O username deve ter entre 5 e 16 caracteres."
            } else this.usernameErrLength = ""
        },
        reset () {
            this.serverMsg = "",
            this.usernameErrChar = "",
            this.usernameErrLength = "",
            this.firstNameErrLength = ""
        }
    },
    mounted () {
        if (this.$route.query?.err) {
            this.serverMsg = 'Já existe uma conta cadastrada com esse e-mail.'
        }
    }
}
</script>

<style scoped>
article.dark form { border-color: var(--black-half); }
article form { border-color: var(--white-half); }

article.dark fieldset input,
article.dark fieldset,
article.dark button.btn-google {
    border-color: var(--black-half);
}

article fieldset input,
article fieldset,
article button.btn-google {
    border-color: var(--white-half);
}

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
    border: 1px solid;
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

.msg {
    color: brown;
    font-weight: 600;
}

.err {
    width: 100%;
}

.err p {
    text-align: left;
    margin-bottom: 0; margin-left: 5px;
}
</style>