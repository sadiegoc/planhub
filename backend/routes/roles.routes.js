module.exports = app => {
    app.route('/roles')
        .get(app.controllers.rolesController.getRoles)
}