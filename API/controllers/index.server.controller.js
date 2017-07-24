var jwt = require('jwt-simple'),
	config = require('../config/config');


exports.login = function(req, res) {

	var username = req.body.username || '',
		password = req.body.password || '';

	if (username == '' || password == '') {
		res.status(401);
		res.json({
			"status": 401,
			"message": "Invalid credentials"
		});

		return;
	}

	// Fire a query to your DB and check if the credentials are valid
	var dbUserObj = auth.validate(username, password);

	if (!dbUserObj) {
		res.status(401);
		res.json({
			"status": 401,
			"message": "Invalid credentials"
		});

		return;
	}

	if (dbUserObj) {
		// If authentication is successful, we will generate a token and dispatch it to the client

		res.json(getToken(dbUserObj));
	}
};

exports.validate = function (username, password) {
	//TODO: need to define a user schema and test the password against the credential in database
	var dbUserObj = {
		name: 'john',
		role: 'admin',
		username: 'john.doe'
	};

	return dbUserObj;
};

exports.validateUser = function (username) {
	var dbUserObj = {
		name: 'john',
		role: 'admin',
		username: 'john.doe'
	};

	return dbUserObj;
};


function getToken(user) {
	var expires = expiresIn(7);
	var token = jwt.encode({
		exp: expires,
		user: user
	}, config.authTokenSecret);

	return {
		token: token,
		expires: expires,
		user: user
	};
};

function expiresIn(numberOfDays) {
	var dateObj = new Date();
	return dateObj.setDate(dateObj.getDate() + numberOfDays);
};