/**
 * Created by vishal on 12/10/16.
 */
'use strict';

angular.module('services.tokenAuth', []).factory('tokenAuth', ['$http', '$window', function($http ,$window) {

    let saveToken = (token) => {
        $window.localStorage['auth-token'] = token;
    };

    let getToken = () =>{
        return $window.localStorage['auth-token'];
    };

    let isLoggedIn = () => {
        let token = getToken();
        let data;

        if(token){
            data = token.split('.')[1];
            data = $window.atob(data);
            data = JSON.parse(data);
            // Check if the token is not expired.
            return data.exp > Date.now() / 1000;
        } else {
            return false;
        }
    };

    let loggedInUser = () => {
        if(isLoggedIn()){
            let token = getToken();
            let data = token.split('.')[1];
            // user info is base64 encoded in token
            // atob base64 decodes the token
            data = $window.atob(data);
            data = JSON.parse(data);
            return {
                email : data.email,
                name : data.name
            };
        }
    };

    let register = (user) =>{
        return $http.post('/api/v2/social-network/register', user).success(function(data){
            console.log(data);
            saveToken(data.token);
        });
    };

    let login = (user) => {
        return $http.post('/api/v2/social-network/login', user).success(function(data) {
            console.log(data);
            saveToken(data.token);
        });
    };

    let logout = function() {
        $window.localStorage.removeItem('auth-token');
    };

    return {
        loggedInUser : loggedInUser,
        saveToken : saveToken,
        getToken : getToken,
        isLoggedIn : isLoggedIn,
        register : register,
        login : login,
        logout : logout
    };

}]);