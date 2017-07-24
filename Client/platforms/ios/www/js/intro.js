wtv.controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate) {

  // Initialize the slider index
  $scope.slideIndex = 0;
 
  // Called to navigate to the main app
  $scope.skipIntro = function() {
    $state.go('main');
  };

  $scope.signup = function() {
    $state.go('signup');
  };
  
  // $scope.next = function() {
  //   $ionicSlideBoxDelegate.next();
  // };
  // $scope.previous = function() {
  //   $ionicSlideBoxDelegate.previous();
  // };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };
})