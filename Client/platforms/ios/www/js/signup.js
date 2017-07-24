wtv.controller('SignupCtrl', function($scope, $state) {

	$scope.editUserProfile = function() {
		$state.go('userProfile');
	};
  
})