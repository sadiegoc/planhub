const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const User = require('../models/User')

module.exports = app => {

    // salva a sessão do usuário
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    
    // busca as informações do usuário no banco de dados
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.getById(id)
            done(null, user)
        } catch (error) {
            done(error, null)
        }
    })
    
    // estratégia usada para a autenticação
    passport.use(
        new GoogleStrategy({
            // options for the google strategies
            callbackURL: '/auth/google/redirect', // Authorized redirect URI
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }, async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.getByGoogleID(profile.id)

                if (!user) {
                    const toSave = {
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        googleID: profile.id,
                        auth: 'oauth'
                    }
    
                    user = await User.save(toSave)
                }

                done(null, user)
            } catch (error) {
                done(error, null)
            }
        })
    )

    app.use(passport.initialize())
    app.use(passport.session())
}