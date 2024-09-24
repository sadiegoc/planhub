const Roles = require('../models/Roles')

module.exports = app => {
    const { existsOrError } = app.controllers.validation
    
    const getRoles = async (req, res) => {
        try {
            const roles = await Roles.getAll()
            existsOrError(roles, 'Nenhum cargo encontrado.')
            res.status(200).json(roles)
        } catch (err) {
            return res.status(500).send(err)
        }
    }

    return { getRoles }
}