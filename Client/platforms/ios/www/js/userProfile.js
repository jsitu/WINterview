wtv.controller('UserProfileCtrl', function($scope, $state, $ionicSlideBoxDelegate) {

	$scope.slideIndex = 0;

	// Called each time the slide changes
	$scope.slideChanged = function(index) {
		$scope.slideIndex = index;
	};

	// Skip and go straight to the main screen
	$scope.skipToMainScreen = function() {
		$state.go('main');
	};

	// Go to the next slide
	$scope.next = function() {
		$ionicSlideBoxDelegate.next();
	};

})