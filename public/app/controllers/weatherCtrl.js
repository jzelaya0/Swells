//weatherCtrl.js

angular.module('weatherCtrl', ['weatherService'])
  .controller('weatherController', function(Weather){
    var vm = this;
    // //Function to let user find weather report
    vm.findWeather = function(){

      vm.place = '';

      //Get the weather
      Weather.getWeather(vm.city)
        .success(function(data){
          //Bind data on success to vm.place
          console.log(data);
          vm.place = data;

          //Clear the form
          vm.city = ''
        });
    }


  });//End weatherController
