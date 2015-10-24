//./public/app/app.js
angular.module('swellsApp', [
  'appRoutes',
  'authService',
  'userService',
  'surfService',
  'weatherService',
  'surfReportService',
  'mainCtrl',
  'userCtrl',
  'surfCtrl',
  'mapCtrl',
  'surfReportCtrl',
  'weatherCtrl',
  'ngMessages',
  'ngAnimate',
  'ui.bootstrap',
  'chart.js'
])
  //application configuration to integrate tokens into our requests
  .config(function($httpProvider){
    //attach auth interceptor to the http requests
    $httpProvider.interceptors.push('AuthInterceptor');
  });
