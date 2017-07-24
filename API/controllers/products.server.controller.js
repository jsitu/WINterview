exports.getAll = function (req, res) {
	// TODO: Database call
	var allProducts = data;
	res.json(allProducts);
};

exports.getOne = function (req, res) {
	var id = req.params.id;
	// TODO: Database call
	// var product = data[0];
	// res.json(product);
};

exports.create = function (req, res) {
	var newProduct = req.body;
	data.push(newProduct);
	res.json(newProduct);
};

exports.update = function (req, res) {
	var updateProduct = req.body;
	var id = req.params.id;
	// TODO: Database call
	// data[id] = updateProduct;
	// res.json(updateProduct);
};

exports.delete = function (req, res) {
	var id = req.params.id;
	// TODO: Database call
	// data.splice(id, 1);
	res.json(true);
};

// Test data
var data = [{
  name: 'product 1',
  id: '1'
}, {
  name: 'product 2',
  id: '2'
}, {
  name: 'product 3',
  id: '3'
}];