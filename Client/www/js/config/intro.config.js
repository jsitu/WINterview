(function(){
  'use strict';

  angular.module('winterviewApp')
	    .config(function($stateProvider) {
			$stateProvider
				.state('intro', {
				url: '/',
				templateUrl: 'templates/intro.html',
				controller: function($scope, $state, $ionicSlideBoxDelegate){
					// Initialize the slider index
					$scope.slideIndex = 0;

					// Called each time the slide changes
					$scope.slideChanged = function(index) {
						$scope.slideIndex = index;
					};
				}
			})
		})
}());