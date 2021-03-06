// authService.js

angular.module('authService', [])
  // ============================================
  //auth factory to login and get information
  //inject $http for communicating with the API
  //inject $q to return promise objects
  //inject AuthToken to manage tokens
  // ============================================

  .factory('Auth', function($http, $q, AuthToken){
    //create auth factory object
    var authFactory = {};

    // handle login for users
    // Post request to /api/authenticate
    authFactory.login = function(username, password){
      //return the promise object and its data
      return $http.post('/api/authenticate', {
        username: username,
        password: password
      })
        .success(function(data){
          AuthToken.setToken(data.token);
          return data;
        });
    };

    //log a user out by clearing the token useing AuthToken factory
    authFactory.logout = function(){
      //clear the token
      AuthToken.setToken();
    };

    //check if a user is logged in and check if there is a local token
    authFactory.isLoggedIn = function(){
      if(AuthToken.getToken())
        return true;
      else
        return false;
    };

    //get the logged in user
    authFactory.getUser = function(){
      if(AuthToken.getToken())
        return $http.get('/api/me');
      else
        return $q.reject({message: "User doesn't have a token"});
    };

    //return auth factory object
    return authFactory;
  })//End Auth

  // ============================================
  // factory for handling tokens
  // inject $window to store token on the client-side
  // ============================================

  .factory('AuthToken', function($window){
    var authTokenFactory = {};

    //get the token out of local storage
    authTokenFactory.getToken = function(){
      return $window.localStorage.getItem('token');
    };

    //set the token or clear the token
    //if token is passed, set token - if there is no token, clear it from local storage
    authTokenFactory.setToken = function(token){
      if(token)
        $window.localStorage.setItem('token', token);
      else
        $window.localStorage.removeItem('token');
    };

    //return auth token factory
    return authTokenFactory;
  })//End AuthToken

  // ============================================
  // application configuration to integrate token into requests
  // ============================================

  .factory('AuthInterceptor', function($q, $location, AuthToken){
    var interceptorFactory = {};

    //attach the token to all HTTP requests
    interceptorFactory.request = function(config){
      //grab the token
      var token = AuthToken.getToken();

      //Reset Headers for other API request
      var isWeatherAPI = config.url.indexOf('api.wunderground.com') > -1;
      var openWeatherAPI = config.url.indexOf('api.worldweatheronline.com') > -1;

      if(!isWeatherAPI && !openWeatherAPI){
      //If token exists then add it to the header as x-access-token
        if(token){
          config.headers['x-access-token'] = token;
        }
      }

      return config;
    };

    //On response errors

    interceptorFactory.responseError = function(response){
      //If server returns a 403 forbidden response
      if(response.status == 403)
        $location.path('/login');

      //return the errors from the server as a promise
      return $q.reject(response);
    };

    //return interceptorFactory
    return interceptorFactory;
  });//End AuthInterceptor
