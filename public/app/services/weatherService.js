//weatherService.js

angular.module('weatherService', [])

  .factory('Weather', function($http, $q){
    //Create an empty Weather factory
    weatherFactory = {};

    //Make a request to GET weather by zip code
    weatherFactory.getWeather = function(zip){
      $http.get('http://api.openweathermap.org/data/2.5/forecast/city?id=524901',
                {
                  headers: {'Content-Type': undefined}
                })
        //Resolve our promise with the data requested
        .success(function(data){
          console.log(data);
        })
        //Promise will be rejected
        .error(function(err){
          console.log('Error getting data');
        });
        return $q.reject(zip);
    };//end getWeather

    //return the weatherFactory;
    return weatherFactory;
  });//End Weather Factory
