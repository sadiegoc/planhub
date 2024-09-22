<template>
    <article id="username">
        <div class="container">
            <form @submit.prevent="submit">
                <fieldset>
                    <legend>Nome de usuário</legend>
                    
                    <input type="text" v-model="user.username" @input="validateUsername" placeholder="Nome de usuário">
                    
                    <div class="err">
                        <p v-if="serverMsg" class="msg">{{ serverMsg }}</p>
                        <p v-if="usernameErrChar" class="msg">{{ usernameErrChar }}</p>
                        <p v-if="usernameErrLength" class="msg">{{ usernameErrLength }}</p>
                    </div>
                    
                    <button type="submit" class="btn-enter">
                        Enter
                    </button>
                </fieldset>
            </form>
        </div>
    </article>
</template>

<script>
import { userStorage } from '@/config/global';
import Auth from '@/services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { mapState } from 'vuex';

export default {
    name: 'UsernamePage',
    computed: mapState(['dark']),
    data: function () {
        return {
            user: {},
            isLogin: false,
            serverMsg: "",
            usernameErrChar: "",
            usernameErrLength: ""
        }
    },
    methods: {
        validateUsername () {
            const regex = /^[a-zA-Z0-9._!@]+$/
            if (this.user.username && !regex.test(this.user.username)) {
                this.usernameErrChar = "O username só pode conter letras, números, ., _, ! ou @."
            } else this.usernameErrChar = ""

            if (this.user.username.length < 5 || this.user.username > 16) {
                this.usernameErrLength = "O username deve ter entre 5 e 16 caracteres."
            } else this.usernameErrLength = ""
        },
        getCookie (name) {
            const value = `; ${document.cookie}`
            const parts = value.split(`; ${name}=`)
            if (parts.length === 2) return parts.pop().split(';').shift()
        },
        submit () {
            Auth.register(this.user).then(res => {
                this.$store.commit('setUser', res.data)
                localStorage.setItem(userStorage, JSON.stringify(res.data))
                this.$router.push({ name: 'dashboard' })
            })
            .catch(err => console.log(err))
        },
        reset () {
            this.serverMsg = "",
            this.usernameErrChar = "",
            this.usernameErrLength = ""
        }
    },
    mounted () {
        const token = this.getCookie('auth_token')
        if (token) {
            this.user = jwtDecode(token)
        } else {
            this.$router.push({ name: 'auth' })
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