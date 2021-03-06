//surfReportService.js

angular.module('surfReportService', [])

  .factory('SurfReport', function($http){
    //Create an empty surfReport factory
    var surfReportFactory = {};

    surfReportFactory.getReport = function(location){
      var url = 'https://api.worldweatheronline.com/free/v2/marine.ashx?key=fde683c2cd030299ffd7d9def91fb&format=json&q=';
      return $http.get(url + location.city + ',' + location.state);
    };

    //Return factory for later use
    return surfReportFactory;
  });
