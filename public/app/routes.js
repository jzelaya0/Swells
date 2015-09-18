//./public/app/routes.js

angular.module('appRoutes', ['ngRoute'])
  .config(function($routeProvider, $locationProvider){
    $routeProvider

    //homepage route
    .when('/',{
      templateUrl : 'app/views/pages.html'
    });

    //Remove hash in the Url
    $locationProvider.html5(true);
  })//End config
