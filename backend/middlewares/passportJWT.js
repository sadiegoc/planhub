require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET

const passport = require('passport')
const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passportJwt
const User = require('../models/User')

module.exports = app => {
    const params = {
        secretOrKey: JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const strategy = new Strategy(params, async (payload, done) => {
        try {
            const user = await User.getById(payload.id)
            done(null, user ? { ...payload } : false)
        } catch (err) {
            done(err, false)
        }
    })

    passport.use(strategy)

    return {
        authenticate: () => passport.authenticate('jwt', { session: true })
    }
}