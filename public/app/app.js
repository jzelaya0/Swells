//./public/app/app.js
angular.module('swellsApp', [
  'appRoutes',
  'authService',
  'userService',
  'surfService',
  'weatherService',
  'mainCtrl',
  'userCtrl',
  'surfCtrl',
  'mapCtrl',
  'weatherCtrl',
  'ngMessages',
  'ngAnimate',
  'ui.bootstrap'
])
  //application configuration to integrate tokens into our requests
  .config(function($httpProvider){
    //attach auth interceptor to the http requests
    $httpProvider.interceptors.push('AuthInterceptor');
  });
