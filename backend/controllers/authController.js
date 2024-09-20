require('dotenv').config()

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')

const JWT_SECRET = process.env.JWT_SECRET
const dayTime = 60 * 60 * 24

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.controllers.validation

    // função para encriptar a senha antes de salvar no banco de dados
    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    // função para fazer login de usuário
    const login = async (req, res) => {
        if (!req.body.email || !req.body.password) return res.status(400).send('Fields cannot be empty!')

        const user = await User.getByEmail(req.body.email)

        // usuário não encontrado
        if (!user) return res.status(400).send('User or password are invalids!')

        // compara as senhas
        const isMatch = bcrypt.compareSync(req.body.password, user.password)

        // a senha está incorreta
        if (!isMatch) return res.status(401).send('User or password are invalids!')

        const now = Math.floor(Date.now() / 1000)
        const payload = {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            iat: now,
            exp: now + (dayTime * 2)
        }

        res.status(200).json({
            ...payload,
            token: jwt.sign(payload, JWT_SECRET)
        })
    }

    // função para cadastrar um novo usuário ou editar um já existente
    const register = async (req, res) => {
        const user = { ...req.body } // recebe o usuário pelo body

        // testes de validação das informações
        try {
            existsOrError(user.name, 'name not given!')
            existsOrError(user.username, 'username not given!')
            existsOrError(user.email, 'E-mail not given!')
            existsOrError(user.password, 'Password not given!')
            existsOrError(user.confirmPassword, 'Password confirmation not given!')
            equalsOrError(user.password, user.confirmPassword, 'Passwords don\'t match!')

            // verificando se já existe o usuário no banco de dados
            const userFromDB = await User.getByEmail(user.email)

            // caso esteja salvando, precisamos nos certificar de que o usuário não existe
            notExistsOrError(userFromDB, 'This E-mail already exists!')
        } catch (err) {
            return res.status(400).send(err)
        }

        // codifica a senha do usuário
        // e deleta o confirmPassword para não ser salvo no banco de dados
        user.password = encryptPassword(user.password)
        delete user.confirmPassword

        user.auth = 'jwt'

        await User.save(user)
        res.status(204).send()
    }

    return { login, register }
}