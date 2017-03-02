'use strict';

angular.module('SocialNetwork.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope','$location', 'tokenAuth' , function($scope, $location, tokenAuth) {
    let loginCredentials = {};
    loginCredentials.email = "";
    loginCredentials.password = "";
    $scope.loginCredentials = loginCredentials;
    if(tokenAuth.isLoggedIn()){
        $location.path('view3');
    }
    $scope.logMeIn = function() {
        tokenAuth.login($scope.loginCredentials).then(function () {
            $location.path('view3');
        },function () {
            $window.alert("Login Failed Please check your credentials");
        });

    };


}]);