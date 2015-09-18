//./public/app/routes.js

angular.module('appRoutes', ['ngRoute'])
  .config(function($routeProvider, $locationProvider){
    $routeProvider

    //homepage route
    .when('/',{
      templateUrl : 'app/views/pages/home.html'
    })

    .when('/login',{
      templateUrl: 'app/views/pages/login.html',
      controller: 'mainController',
      controllerAs: 'login'
    })

    //Remove hash in the Url
    $locationProvider.html5Mode(true);
  })//End config
