(function(){
  'use strict';

  angular.module('winterviewApp', ['ionic'])
         .run(function($ionicPlatform) {
           $ionicPlatform.ready(function() {
              // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
              // for form inputs)
              if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
              }
              if(window.StatusBar) {
                StatusBar.styleDefault();
              }
           });
        })
}());
(function(){
  'use strict';

  angular.module('winterviewApp')
        .config(function($urlRouterProvider) {
           $urlRouterProvider.otherwise("/");
         })
}());
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
(function(){
  'use strict';

  angular.module('winterviewApp')
       .service('LocalStorageService', localStorageServiceFn);

  localStorageServiceFn.$inject = ['$window'];

  function localStorageServiceFn ($window) {
    return {
      set: function(key, value) {
        $window.localStorage[key] = value;
      },
      get: function(key, defaultValue) {
        return $window.localStorage[key] || defaultValue;
      },
      setObject: function(key, value) {
        $window.localStorage[key] = JSON.stringify(value);
      },
      getObject: function(key) {
        return JSON.parse($window.localStorage[key] || '{}');
      }
    }
  }

}());
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
(function(){
    'use strict';

    angular.module('winterviewApp')
           .directive('addButtons', function() {

                function link( $scope, element, attributes ) {
                }

                return({
                    scope:{ 
                        showBackdrop:'='
                    },
                    link: link,
                    restrict: "E",
                    templateUrl: 'templates/directive/addButtons.html'
                });
            })
}());