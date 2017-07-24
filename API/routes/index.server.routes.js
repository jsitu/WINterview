'use strict';

var indexController = require('../controllers/index.server.controller.js');

// Routes that can be accessed by anyone
module.exports = function(app) {
	app.route('/login')
		.post(indexController.login);
};