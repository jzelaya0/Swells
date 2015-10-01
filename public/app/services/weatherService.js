//weatherService.js

angular.module('weatherService', [])

  .factory('Weather', function($http, $q){
    //Create an empty Weather factory
    weatherFactory = {};

    //Make a request to GET weather by city code
    weatherFactory.getWeather = function(weatherData){
      //Find weather by city
      var url = 'https://api.wunderground.com/api/e21baeb218c8772c/conditions/q/';
      return $http.get(url + weatherData.state +'/' + weatherData.city +'.json');
    };//end getWeather

    //Make a request to GET the forecast for a city
    weatherFactory.getForecast = function(forecastData){
      var url = 'https://api.wunderground.com/api/e21baeb218c8772c/forecast/q/';
      return $http.get( url + forecastData.state + "/" + forecastData.city + '.json');
    };

    //return the weatherFactory;
    return weatherFactory;
  });//End Weather Factory
