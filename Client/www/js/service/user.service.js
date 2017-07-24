(function(){
	'use strict';

	angular.module('winterviewApp')
		   .service('UserService', userServiceFn);

	userServiceFn.$inject = ['$http'];

	function userServiceFn ($http) {
		return {
			signUp: function(email, password) {
			    return $http.post('//localhost:8000/signup', {email: email, password: password});
			},

			logIn: function(email, password) {
			    return $http.post('//localhost:8000/signin', {email: email, password: password});
			},

			logOut: function() {
				// TODO
			}
		}
	}

}());