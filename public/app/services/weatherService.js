//weatherService.js

angular.module('weatherService', [])

  .factory('Weather', function($http, $q){
    //Create an empty Weather factory
    weatherFactory = {};

    //Make a request to GET weather by city code
    weatherFactory.getWeather = function(city){
      //Find weather by city
      return $http.get('http://api.openweathermap.org/data/2.5/weather?q=' + city);
    };//end getWeather

    //return the weatherFactory;
    return weatherFactory;
  });//End Weather Factory
