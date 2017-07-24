(function(){
  'use strict';

  angular.module('winterviewApp')
        .config(function($stateProvider) {
			$stateProvider
			.state('signin', {
				url: '/signin',
				templateUrl: 'templates/account/signin.html',
				controller: function($scope, $http, $state, $timeout, LocalStorageService, UserService){

					$scope.signInError = {showError: false, message: ''};
					$scope.user = {email: '', password: ''};
					$scope.zoomOut = false;

					$scope.signIn = function () {
						UserService.logIn($scope.user.email, $scope.user.password)
						.success(function(data) {
		                    if (!data.error) {

		                    	LocalStorageService.setObject('auth', {
		                    		isLogged: true,
		                    		userId: data.userId
		                    	});

								$scope.signinSuccess = true;
								$scope.zoomOut = true;

								$timeout(function(){
									$state.go('main.interview');
								}, 1200);
							}
							else {
								$scope.signInError = {
									showError: true,
									message: data.error
								}
							}
		                })
		                .error(function(status, data) {
		                    console.log(status);
		                    console.log(data);
		                });
					}
				}
			})
		})
}());