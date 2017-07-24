(function(){
  'use strict';

  angular.module('winterviewApp')
        .config(function($urlRouterProvider) {
           $urlRouterProvider.otherwise("/");
         })
}());