//./public/app/app.js
angular.module('swellsApp', [
  // 'ngAnimate',
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
  'ngMessages'
])
  //application configuration to integrate tokens into our requests
  .config(function($httpProvider){
    //attach auth interceptor to the http requests
    $httpProvider.interceptors.push('AuthInterceptor');
  });
