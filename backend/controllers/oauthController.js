require('dotenv').config()

const passport = require("passport")
const jwt = require('jsonwebtoken')

const dayTime = 60 * 60 * 24

module.exports = {
    // chama o login do usuário
    googleAuth: passport.authenticate('google', {
        scope: ['profile', 'email'], // seleciona o profile e o email do usuário
        prompt: 'select_account' // força sempre selecionar a conta do google
    }),

    // quando o usuário é autenticado, ele vem pra cá
    googleAuthCallback: passport.authenticate('google', { session: false }),

    // terminada a função de cima, ele chama a callback para gerar o seu token
    callback: (req, res) => {
        const user = req.user ? { ...req.user } : null
        if (!user) res.redirect(`${process.env.CORS_ORIGIN}/auth?err=email`)

        delete user.password
        if (user.id && user.username) {
            const now = Math.floor(Date.now() / 1000)
            const payload = {
                ...user,
                iat: now,
                exp: now + (dayTime * 2)
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET)

            res.cookie('auth_token', token, {
                httpOnly: false, // para ser acessível pelo js do frontend
                secure: process.env.NODE_ENV === 'production', // false
                sameSite: 'Lax'
            })

            res.redirect(`${process.env.CORS_ORIGIN}/dashboard`)
        } else {
            const token = jwt.sign(user, process.env.JWT_SECRET, { noTimestamp: true })
    
            res.cookie('auth_token', token, {
                httpOnly: false, // para ser acessível pelo js do frontend
                secure: process.env.NODE_ENV === 'production', // false
                sameSite: 'Lax'
            })

            res.redirect(`${process.env.CORS_ORIGIN}/auth/username`)
        }
    },

    logout (req, res) {
        // limpa o token de autenticação
        res.clearCookie('auth_token')

        // para usar com passport também é possível encerrar a sessão
        req.logout((err) => {
            if (err) { return res.status(500).send('Erro ao encerrar a sessão.') }
            res.status(204).send()
        })
    }
}