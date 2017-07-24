'use strict';

var config = require('./config'),
	express = require('express'),
	path = require('path'),
	logger = require('morgan'),
	compress = require('compression'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	session = require('express-session'),
	passport = require('passport');

// Define the Express configuration method
module.exports = function() {
	// Create a new Express application instance
	var app = express();

	// Use the 'NDOE_ENV' variable to activate the 'morgan' logger or 'compress' middleware
	if (process.env.NODE_ENV === 'development') {
		app.use(logger('dev'));
	} else if (process.env.NODE_ENV === 'production') {
		app.use(compress());
	}

	// Use the 'body-parser' and 'method-override' middleware functions
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	// Configure the 'session' middleware
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret
	}));

	// Set the application view engine and 'views' folder
	// app.set('views', './app/views');
	// app.set('view engine', 'ejs');

	app.use(passport.initialize());
	app.use(passport.session());

	app.all('/*', function(req, res, next){
		// CORS headers
		res.header("Access-Control-Allow-Origin", "*");
		res.header('Access-Control-Allow-Method', 'GET, PUT, POST, DELETE, OPTIONS');
		// Set custom headers for CORS
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
		if (req.method == 'OPTIONS') {
			res.status(200).end();
		} else {
			next();
		}
	});

	// app.all('/api/v1/*', require('../middlewares/validateRequest'));

	// List all the routes
	require('../routes/index.server.routes.js')(app);
	require('../routes/products.server.routes.js')(app);
	require('../routes/users.server.routes.js')(app);

	// If no route is matched by now, it must be a 404
	app.use(function(req, res, next) {
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
	});

	// Configure static file serving
	// app.use(express.static('./public'));

	// Return the Express application instance
	return app;
};	