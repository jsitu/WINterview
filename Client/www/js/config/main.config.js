(function(){
  'use strict';

  angular.module('winterviewApp')
        .config(function($stateProvider) {
			$stateProvider
			.state('main', {
				url: '/main',
				abstract: true,
				templateUrl: 'templates/main.html',
				controller: function($scope) {
					$scope.showAddButtonBackdrop = false;
					$scope.toggleAddButtonBackdrop = function() {
						$scope.showAddButtonBackdrop = !$scope.showAddButtonBackdrop;
					}
				}
			})
		})
}());