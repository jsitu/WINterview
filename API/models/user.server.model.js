'use strict';

var mongoose = require('mongoose'),
	crypto = require('crypto'),
	Schema = mongoose.Schema;

var UserSchema = new Schema({
	nickName: String,
	firstName: String,
	lastName: String,
	gender: String,
	birthYear: String,
	education: String,
	email: {
		type: String,
		index: true,
		unique: true,
		match: [/.+\@.+\..+/, "Please fill a valid email address"]
	},
	password: {
		type: String,
		validate: [
			function(password) {
				return password.length >= 6;
			},
			'Password should be longer'
		]
	},
	salt: {
		type: String
	},
	provider: {
		type: String
		// required: 'Provider is required'
	},
	providerId: String,
	providerData: {},
	role: {
		type: String,
		enum: ['Admin', 'User'],
		default: 'User'
	},
	created: {
		type: Date,
		default: Date.now
	}
});

// Set the 'fullname' virtual property
// UserSchema.virtual('fullname').get(function() {
// 	return this.firstName + " " + this.lastName;
// }).set(function(fullName) {
// 	var splitName = fullName.split(' ');
// 	this.firstName = splitName[0] || '';
// 	this.lastName = splitName[1] || '';
// });

// Use a pre-save middleware to hash the password
UserSchema.pre('save', function(next) {
	if (this.password) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}

	next();
});

// Create an instance method for hashing a password
UserSchema.methods.hashPassword = function(password) {
	return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

// Create the 'authenticate' instance method
UserSchema.methods.authenticate = function(password) {
	return this.password === password;
}

// Create the 'findOneByUsername' static method
UserSchema.statics.findOneByUsername = function (username, callback) {
	this.findOne({
		username: new RegExp(username, 'i')
	}, callback);
};

UserSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

// Create the 'User' model out of the 'UserSchema'
mongoose.model('User', UserSchema);