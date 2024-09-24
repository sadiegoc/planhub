const db = require('../config/database')

module.exports = {
    async getAll () {
        return await db('roles').select()
    }
}