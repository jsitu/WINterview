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