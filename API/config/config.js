// Invoke 'strict' JavaScript mode
'user strict';

// Load the correct configuration file according to the 'NODE_EVN' variable
module.exports = require('./env/' + process.env.NODE_ENV + '.js');