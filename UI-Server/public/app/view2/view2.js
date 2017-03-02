'use strict';

angular.module('SocialNetwork.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope','$location', 'tokenAuth' , function($scope, $location, tokenAuth) {
    let newUser = {};
    newUser.email = "";
    newUser.password = "";
    newUser.name = "";
    $scope.newUser = newUser;
    $scope.fn = {};
    $scope.fn.signUp = signup;
    function signup(){
      tokenAuth.register($scope.newUser);
      $location.path('view3');
    }
}]);