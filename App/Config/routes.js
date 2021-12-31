'use strict'

module.exports = function(app) {
    var users = require('../Controllers/usersController')
    var artikel = require('../Controllers/artikelController')
        // users route
    app.route('/').get(users.index)
    app.route('/users').get(users.users)
    app.route('/users/:id').get(users.getById)
    app.route('/users/create').post(users.create)
    app.route('/users/update').put(users.update)
    app.route('/users/delete').delete(users.delete)
    app.route('/nested').get(users.usersNested)

    // artikel route
    app.route('/artikel').get(artikel.index)
    app.route('/artikel/:id').get(artikel.getById)


}