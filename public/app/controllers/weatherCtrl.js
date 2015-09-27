//weatherCtrl.js

angular.module('weatherCtrl', ['weatherService'])
  .controller('weatherController', function(Weather){
    var vm = this;

    // FIND CURRENT WEATHER CONDITIONS
    // ========================================
    vm.findWeather = function(){
      //Data that will return from API query
      vm.place = '';

      //Get the weather
      Weather.getWeather(vm.weatherData)
        .success(function(data){
          //Bind data on success to vm.place
          vm.place = data;

          //Clear the form
          vm.weatherData = '';
        });
    };//End findWeather


    // FIND FORECAST
    // ========================================

    vm.findForecast = function(){
      //Data that will return from API query
      vm.location = '';


      Weather.getForecast(vm.forecastData)
        .success(function(data){
          //Bind the data to vm.location
          console.log(data);
          vm.location = data;

          //Clear the form
          vm.forecastData = '';
        });//End success
    };//End findForecast


  });//End weatherController
