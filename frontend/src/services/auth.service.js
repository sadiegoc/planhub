import { baseURL } from "@/config/global";
import http from "./http";

class Auth {
    login (user) {
        return http.post('/auth/login', user)
    }

    register (user) {
        return http.post('/auth/register', user)
    }

    authGoogle () {
        window.location.href = baseURL + '/auth/google'
    }

    logout () {
        return http.get('/auth/logout', { withCredentials: true })
    }
}

export default new Auth()