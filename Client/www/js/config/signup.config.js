(function(){
  'use strict';

  angular.module('winterviewApp')
        .config(function($stateProvider) {
			$stateProvider
			.state('signup', {
				url: '/signup',
				templateUrl: 'templates/account/signup.html',
				controller: function($scope, $http, $timeout, $state, UserService, LocalStorageService){

					$scope.isEmailValid = true;
					$scope.isPasswordValid = true;
					$scope.signupSuccess = false;
					$scope.signupError = {showError: false, message: ''};
					$scope.user = {
						email: '',
						password: ''
					};

					$scope.signup = function() {

						validateInput();

						if ($scope.isEmailValid && $scope.isPasswordValid) {

							UserService.signUp($scope.user.email, $scope.user.password)
							.success(function(data) {

			                    if (!data.error) {

			                    	LocalStorageService.setObject('auth', {
			                    		isLogged: true,
			                    		userId: data.userId
			                    	});

									$scope.signupSuccess = true;

									$timeout(function(){
										$state.go('signupProfile');
									}, 1200);
								}
								else {
									$scope.signupError = {
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

					function validateInput() {
						$scope.isEmailValid = $scope.signupForm.email.$error.email ? false : true;
						$scope.isPasswordValid = $scope.signupForm.password.$error.minlength ? false : true;
					}
				}
			})
		})
}());