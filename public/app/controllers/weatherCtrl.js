//weatherCtrl.js

angular.module('weatherCtrl', ['weatherService'])
  .controller('weatherController', function(Weather){
    var vm = this;
    // //Function that defaults to Santa Monica Weather
    function fetchWeather(zip){
      Weather.getWeather(zip)
        .then(function(data){
          //Bind data on success to vm.location
          console.log(data);
          vm.location = data;
        });
    }

    //Invoke the default weathe location
    fetchWeather('90401');

    vm.findWeather = function(zip){
      //Set location to be empty
      vm.location = '';
      //Call the default function and pass the zipcode
      fetchWeather(zip);
    };


  });//End weatherController
