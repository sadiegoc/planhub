const db = require('../config/database')

module.exports = {
    async save (user) {
        return await db('users').insert(user)
    },

    async getById (id) {
        return await db('users').where({ id }).first()
    },

    async getByEmail (email) {
        return await db('users').where({ email }).first()
    },

    async getByUsername (username) {
        return await db('users').where({ username }).first()
    },

    async getByGoogleID (googleID) {
        return await db('users').where({ googleID }).first()
    }
}