(function(){
  'use strict';

  angular.module('winterviewApp')
	  .config(function($stateProvider) {
			$stateProvider
			.state('main.interview', {
				url: "/interview",
				views: {
					'interview-tab': {
						templateUrl: "templates/interview/search.html",
						controller: function($scope, $http, LocalStorageService){
							// console.log(LocalStorageService.getObject('auth'));
						}
					}
				}
		    })
		})
}());