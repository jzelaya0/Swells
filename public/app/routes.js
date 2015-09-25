//./public/app/routes.js

angular.module('appRoutes', ['ngRoute'])
  .config(function($routeProvider, $locationProvider){
    $routeProvider

    //homepage route
    .when('/',{
      templateUrl : 'app/views/pages/swells.html'
    })

    .when('/login',{
      templateUrl: 'app/views/pages/login.html',
      controller: 'mainController',
      controllerAs: 'login'
    })

    .when('/signup',{
      templateUrl: 'app/views/pages/signup.html',
      controller: 'userCreateController',
      controllerAs: 'signup'
    })

    .when('/home', {
      templateUrl: 'app/views/pages/home.html',
      controller: 'mapController',
      controllerAs: 'map'
    })

    .when('/sessions',{
      templateUrl: 'app/views/pages/surf_sessions/all.html',
      controller: 'surfController',
      controllerAs: 'surf'
    });

    //Remove hash in the Url
    $locationProvider.html5Mode(true);
  });//End config
