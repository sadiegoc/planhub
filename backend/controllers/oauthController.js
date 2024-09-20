require('dotenv').config()

const passport = require("passport")
const jwt = require('jsonwebtoken')

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
        const user = {
            id: req.user.id,
            name: req.user.name,
            username: req.user.username,
            email: req.user.email,
            googleID: req.user.googleID
        }

        const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '5h' })

        res.cookie('auth_token', token, {
            httpOnly: false, // para ser acessível pelo js do frontend
            secure: process.env.NODE_ENV === 'production', // false
            sameSite: 'Lax'
        })

        res.redirect(`${process.env.CORS_ORIGIN}/dashboard`)
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