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

    .when('/map', {
      templateUrl: 'app/views/pages/map.html',
      controller: 'mapController',
      controllerAs: 'map'
    })

    .when('/sessions',{
      templateUrl: 'app/views/pages/surf_sessions/all.html',
      controller: 'surfController',
      controllerAs: 'surf'
    })

    .when('/sessions/:surf_id', {
      templateUrl: 'app/views/pages/surf_sessions/edit.html',
      controller: 'surfEditController',
      controllerAs: 'surf'
    })

    .when('/weather',{
      templateUrl: 'app/views/pages/weather.html',
      controller: 'weatherController',
      controllerAs: 'weather'
    })

    .when('/report',{
      templateUrl: 'app/views/pages/surfReport.html',
      controller: 'surfReportController',
      controllerAs: 'sr'
    });

    //Remove hash in the Url
    $locationProvider.html5Mode(true);
  });//End config
