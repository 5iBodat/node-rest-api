'use strict'

module.exports = function(app) {
    var data = require('./controller')

    app.route('/').get(data.index)
    app.route('/users').get(data.users)
    app.route('/users/:id').get(data.getById)
    app.route('/users/create').post(data.create)


}