'use strict';

angular.module('SocialNetwork.view3', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view3', {
            templateUrl: 'view3/view3.html',
            controller: 'View3Ctrl'
        });
    }])

    .controller('View3Ctrl', ['$scope','$location', 'tokenAuth', '$http' , function($scope, $location, tokenAuth, $http) {
        $scope.olderPosts = [];
        function getPosts(){
            $http.get('/api/v2/social-network/posts', {
                headers: {
                    Authorization: 'Bearer '+ tokenAuth.getToken()
                }
            }).then(function (res) {
                $scope.olderPosts = res.data.posts;
            }, function (err) {
                console.log(err);
            });
        }

        if(!tokenAuth.isLoggedIn()){
            $location.path('view1');
        }else
            getPosts();

        let currentUser = tokenAuth.loggedInUser();
        $scope.currentUser = currentUser;

        let post = {};
        post.content  = "";
        post.email = currentUser.email;
        post.name = currentUser.name;


        function savePost(){
            $http.post('/api/v2/social-network/save-posts', $scope.currentPost , {
                headers: {
                    Authorization: 'Bearer '+ tokenAuth.getToken()
                }
            }).then(function (res) {
                $scope.olderPosts.push (res.data.post);
                $scope.currentPost.content = "";
            }, function (err) {
                console.log(err);
            });
        }
        $scope.currentPost = post;
        $scope.fn = {};
        $scope.fn.savePost = savePost;

        $scope.fn.logout = function () {
            tokenAuth.logout();
            $location.path('view1');
        }
    }]);