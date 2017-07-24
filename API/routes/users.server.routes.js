'use strict';

var usersController = require('../controllers/users.server.controller.js'),
	passport = require('passport');

// Routes that can be accessed only by authenticated and authorized users
module.exports = function(app) {
  app.route('/api/users')
    .get(usersController.getAll)
    .post(usersController.getOne);

  app.route('/api/users/:id')
    .get(usersController.getOne)
    .put(usersController.update)
    .delete(usersController.delete);

  app.route('/signup')
  	.post(usersController.signup);

  app.route('/signin')
  	.post(usersController.signin);

  app.get('/signout', usersController.signout);
};