import http from "./http";

class Load {
    roles () {
        return http.get('/roles')
    }
}

export default new Load()