'use strict';

// Declare app level module which depends on views, and components
angular.module('SocialNetwork', [
    'ngRoute',
    'SocialNetwork.view1',
    'SocialNetwork.view2',
    'SocialNetwork.view3',
    'services.tokenAuth'
]).config(['$locationProvider', '$routeProvider',  function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({redirectTo: '/view1'});
}]);
