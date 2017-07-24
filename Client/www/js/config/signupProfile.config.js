(function(){
  'use strict';

  angular.module('winterviewApp')
        .config(function($stateProvider) {
			$stateProvider
				.state('signupProfile', {
				url: '/signupProfile',
				templateUrl: 'templates/account/signup-profile.html',
				controllerAs: 'signupProfile',
				controller: function($scope, $http, $state, $timeout, $ionicSlideBoxDelegate, LocalStorageService) {

					$scope.zoomOut = false;
					$scope.done = false;

					var userId = LocalStorageService.getObject('auth').userId;

					$scope.person = {
						nickName: '',
						firstName: '',
						lastName: '',
						gender: '',
						birthYear: '',
						education: ''
					}

					$scope.updateUserProfile = function(nickName, firstName, lastName, gender, birthYear, education) {
						$http.put('//localhost:8000/api/users/' + userId,
						{
							"nickName": $scope.person.nickName,
							"firstName": $scope.person.firstName,
							"lastName": $scope.person.lastName,
							"gender": $scope.person.gender,
							"birthYear": $scope.person.birthYear,
							"education": $scope.person.education
						})
						.success(function(data) {

							$scope.done = true;
							
							if (data.id) {
								$scope.zoomOut = true;

								$timeout(function(){
									$state.go('main.interview');
								}, 1200);
							}
		                })
		                .error(function(status, data) {
		                    console.log(status);
		                    console.log(data);
		                });
					}

					$scope.slideIndex = 0;

					// Called each time the slide changes
					$scope.slideChanged = function(index) {
						$scope.slideIndex = index;
					};

					// Go to the next slide
					$scope.next = function() {
						$ionicSlideBoxDelegate.next();
					};

					$scope.disableSwipe = function () {
				        $ionicSlideBoxDelegate.enableSlide(false);
				    }
				}
			});
		})
}());