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
        if (!req.body.email || !req.body.password) return res.status(400).send('Os campos não podem estar vazios!')

        const user = await User.getByEmail(req.body.email)

        // usuário não encontrado
        if (!user) return res.status(400).send('E-mail ou senha estão incorretos!')

        // compara as senhas
        const isMatch = bcrypt.compareSync(req.body.password, user.password)

        // a senha está incorreta
        if (!isMatch) return res.status(401).send('E-mail ou senha estão incorretos!')

        delete user.password
        const now = Math.floor(Date.now() / 1000)
        const payload = {
            ...user,
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
            existsOrError(user.firstName, 'Nome não informado!')
            existsOrError(user.lastName, 'Sobrenome não informado!')
            existsOrError(user.username, 'Nome de usuário não informado!')
            existsOrError(user.email, 'E-mail  não informado!')

            // verificando se já existe o username no banco de dados
            const userByUsername = await User.getByUsername(user.username)
            notExistsOrError(userByUsername, 'Este nome de usuário já está em uso!')

            // verificando se já existe o email no banco de dados
            const userByEmail = await User.getByEmail(user.email)
            notExistsOrError(userByEmail, 'Este e-mail já está em uso!')

            if (!user.googleID) {
                existsOrError(user.password, 'Senha não informada!')
                existsOrError(user.confirmPassword, 'Confirmação de senha não informada!')
                equalsOrError(user.password, user.confirmPassword, 'As senhas precisam ser iguais!')
            } else {
                await User.save(user)

                const now = Math.floor(Date.now() / 1000)
                const payload = {
                    ...user,
                    iat: now,
                    exp: now + (dayTime * 2)
                }

                return res.status(200).json({
                    ...payload,
                    token: jwt.sign(payload, JWT_SECRET)
                })
            }
        } catch (err) {
            return res.status(400).send(err)
        }

        // codifica a senha do usuário
        // e deleta o confirmPassword para não ser salvo no banco de dados
        user.password = encryptPassword(user.password)
        delete user.confirmPassword

        user.auth = 'jwt'

        await User.save(user)
        res.status(200).json(user)
    }

    return { login, register }
}