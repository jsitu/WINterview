var jwt = require('jwt-simple'),
	validateUser = require('../controllers/index.server.controller').validateUser,
	config = require('../config/config');

module.exports = function(req, res, next) {
	var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];

	if (token) {
		try {
			var decoded = jwt.decode(token, config.authTokenSecret),
				key = decoded.user.username;

			if (decoded.exp <= Date.now()) {
				res.status(400);
				res.json({
					"status": 400,
					"message": "Token Expired"
				});
				return;
			}

			// Authorize the user to see if he can access the resources

			// The key would be the logged in user's username
			var dbUser = validateUser(key);
			if (dbUser) {
				if ((req.url.indexOf('admin') >= 0 && dbUser.role == 'admin') || (req.url.indexOf('admin') < 0 && req.url.indexOf('/api/v1/') >= 0)) {
			          next(); // To move to next middleware
		        } else {
		          res.status(403);
		          res.json({
		            "status": 403,
		            "message": "Not Authorized"
		          });
		          return;
		        }
		    } else {
				// No user with this name exists, respond back with a 401
				res.status(401);
				res.json({
				  "status": 401,
				  "message": "Invalid User"
				});
				return;
			}

		}
		catch (err) {
			res.status(500);
			res.json({
				"status": 500,
				"message": "Something went wrong",
				"error": err
			});
		}
	} else {
		res.status(401);
		res.json({
			"status": 401,
			"message": "Invalid token or key"
		});
		return;
	}
};