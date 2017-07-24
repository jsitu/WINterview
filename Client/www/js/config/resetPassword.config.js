(function(){
  'use strict';

  angular.module('winterviewApp')
        .config(function($stateProvider) {
			$stateProvider
			.state('reset', {
				url: '/reset',
				templateUrl: 'templates/account/reset-password.html',
				controller: function(){
				}
			})
		})
}());