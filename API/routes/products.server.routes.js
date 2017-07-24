'use strict';

var productsController = require('../controllers/products.server.controller.js');

// Routes that can only be accessed by authenticated users
module.exports = function(app) {
	app.route('/api/v1/product')
		.get(productsController.getAll)
		.post(productsController.create);

	app.route('/api/v1/product/:id')
		.get(productsController.getOne)
		.put(productsController.update)
		.delete(productsController.delete);
}