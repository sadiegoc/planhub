module.exports = app => {
    app.post('/auth/login', app.controllers.authController.login)
    app.post('/auth/register', app.controllers.authController.register)

    app.get('/auth/google', app.controllers.oauthController.googleAuth)
    app.get('/auth/google/redirect', app.controllers.oauthController.googleAuthCallback, app.controllers.oauthController.callback)
    app.get('/auth/logout', app.controllers.oauthController.logout)
}