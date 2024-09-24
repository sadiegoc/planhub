<template>
    <article id="profile" :class="{ dark }">
        <div class="container bg-hard" :class="{ dark }">
            <div class="head">
                <div class="photo">
                    <i class="icon">
                        <img v-if="user.profile" :src="user.profile" alt="Profile">
                        <span v-else>{{ user.firstName[0] }}</span>
                    </i>
                </div>
                <div class="options">
                    <button class="btn-upload">Enviar</button>
                    <button class="btn-remove">Remover</button>
                </div>
            </div>
            <div class="body">
                <div class="row">
                    <div class="field">
                        <label for="first-name">
                            Nome<sup>*</sup>
                        </label>
                        <input type="text" id="first-name" v-model="user.firstName" @input="validateFirstName" placeholder="Nome">
                    </div>
                    <div class="field">
                        <label for="last-name">
                            Sobrenome<sup>*</sup>
                        </label>
                        <input type="text" id="last-name" v-model="user.lastName" @input="validateLastName" placeholder="Sobrenome">
                    </div>
                </div>
                <div class="row">
                    <div class="field">
                        <label for="username">
                            Nome de usuário<sup>*</sup>
                        </label>
                        <input type="text" id="username" v-model="user.username" @input="validateUsername" placeholder="Nome de usuário">
                    </div>
                    <div class="field">
                        <label for="email">
                            E-mail<sup>*</sup>
                        </label>
                        <input type="email" id="email" v-model="user.email" placeholder="E-mail">
                    </div>
                </div>
                <div class="row">
                    <div class="field">
                        <label>Gênero</label>
                        <div class="gender">
                            <div class="male">
                                <label class="radio">
                                    <input type="radio" v-model="user.gender" value="M" id="male">
                                    <span class="radiomark"></span>
                                </label>
                                <label for="male">Masculino</label>
                            </div>
                            <div class="female">
                                <label class="radio">
                                    <input type="radio" v-model="user.gender" value="F" id="female">
                                    <span class="radiomark"></span>
                                </label>
                                <label for="female">Feminino</label>
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <label for="mobile-number">Número de celular</label>
                        <input type="text" id="mobile-number" v-model="user.mobileNumber">
                    </div>
                </div>
                <div class="row">
                    <div class="field">
                        <label for="role">Cargo</label>
                        <select name="role" id="role">
                            <option :value="null">Sem cargo</option>
                            <option v-for="role in roles" :value="role.name" :key="role.id">{{ role.name }}</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <button class="save">Salvar</button>
                </div>
            </div>
        </div>
    </article>
</template>

<script>
import Load from '@/services/load.service';
import { mapState } from 'vuex';

export default {
    name: 'ProfilePage',
    data: function () {
        return {
            roles: []
        }
    },
    computed: mapState(['user', 'dark']),
    methods: {
        loadRoles () {
            Load.roles()
                .then(res => this.roles = res.data)
                .catch(err => console.log(err))
        }
    },
    mounted () {
        this.loadRoles()
    }
}
</script>

<style scoped>
article.dark select:hover {
    background-color: var(--black-soft);
}

article select:hover {
    background-color: var(--white-soft);
}

article.dark,
article.dark select {
    background-color: var(--black-half);
}

article,
article select {
    background-color: var(--white-half);
}

article.dark .field input,
article.dark .male,
article.dark .female,
article.dark .radiomark,
article.dark .container {
    border-color: var(--black-soft);
}

article .field input,
article .male,
article .female,
article .radiomark,
article .container {
    border-color: var(--white-soft);
}

article#profile {
    width: 100%; height: calc(100vh - var(--header-h) - var(--footer-h));
    
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    height: 90%; width: 90%;

    margin: 0; padding: 20px;
    border: 1px solid;
    border-radius: var(--border-r);

    display: flex;
    flex-direction: column;
    align-items: center;
}

.body, .head {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.head {
    margin: 15px 0;
}

.row, .gender {
    display: flex;
    justify-content: stretch;
}

.row {
    width: 100%;
    margin-bottom: 15px;
}

.field {
    display: flex;
    flex-direction: column;
    width: 50%; flex-grow: 1;
    margin: 0 5px;
}

.photo {
    margin-bottom: 15px;
}

.photo img {
    width: 120px; border-radius: var(--border-r);
}

.photo i.icon {
    cursor: default;
}

.photo i.icon span {
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

.head button {
    padding: 5px 15px; margin: 0 5px;
    color: white; font-weight: 600;
}

.head .btn-upload {
    background-color: var(--color-theme-1);
}

.head .btn-remove {
    background-color: brown;
}

.row input {
    outline: none; font-size: 1rem;
    background: transparent;
    border: 1px solid; border-radius: 5px;
    padding: 10px 15px;
}

.radio {
    display: flex; align-items: center;
    cursor: pointer;
}

input[type="radio"] {
    display: none;
}

.radiomark {
    display: block;
    cursor: pointer;
    background-color: transparent;
    width: 12px; height: 12px;
    border-radius: 50%;
    border: 1px solid;
}

input[type="radio"]:checked ~ .radiomark {
    background-color: var(--color-theme-2);
    border-color: var(--color-theme-2);
}

label { font-weight: 600; margin-bottom: 5px; cursor: pointer; }
.gender label { margin: 0 0 0 10px; }
.gender input { margin-left: 10px; }
.male { margin-right: 5px; }
.female { margin-left: 5px; }

.male, .female {
    display: flex; align-items: center;
    width: 50%; height: 39px;
    border: 1px solid;
    border-radius: var(--border-r);
}

select {
    outline: none; border: none;
    padding: 5px; border-radius: var(--border-r);
    cursor: pointer;
}

.row:last-child {
    justify-content: flex-end;
}

.save {
    padding: 12px 25px; margin-right: 5px;
    background-color: var(--color-theme-1);
    color: white; font-weight: 600;
}

.save:hover {
    background-color: var(--color-theme-2);
}

@media (max-width: 572px) {
    article#profile {
        height: auto;
    }

    .row {
        flex-direction: column;
        margin-bottom: 0;
    }

    .field {
        width: 100%;
        margin: 0 0 15px 0;
    }

    .container {
        margin: 20px 0;
        height: auto;
    }

    .gender label {
        font-size: 0.8rem;
    }

    .save {
        margin: 0;
    }
}
</style>