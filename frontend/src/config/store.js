import { createStore } from "vuex";
import { userStorage } from "./global";

export default createStore({
    state: {
        user: localStorage.getItem(userStorage) !== undefined ? JSON.parse(localStorage.getItem(userStorage)) : null,
        dark: localStorage.getItem('dark') !== undefined ? JSON.parse(localStorage.getItem('dark')) : true,
        showSideMenu: true
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        toggleTheme (state) {
            state.dark = !state.dark
            localStorage.setItem('dark', state.dark)
        }
    }
})