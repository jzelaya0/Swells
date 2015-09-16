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

    //handle login

    //check if a user is logged in

    //get the user info

    //return auth factory object
    return authFactory;
  })//End Auth

  // ============================================
  // factory for handling tokens
  // inject $windo to store token on the client-side
  // ============================================

  .factory('AuthToken', function($window){
    var authTokenFactory = {};

    //get the token

    //set the token or clear the token

    //return auth token factory
    return authTokenFactory;
  })//End AuthToken

  // ============================================
  // application configuration to integrate token into requests
  // ============================================

  .factory('AuthInterceptor', function($q, $location, AuthToken){
    var interceptorFactory = {};

    //attach the token to every requests


    //redirect if a token doesn't authenticate

    //return interceptorFactory
    return interceptorFactory;
  })//End AuthInterceptor
