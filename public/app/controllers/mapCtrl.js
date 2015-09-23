//mapCtrl.js

angular.module('mapCtrl',['mapService'])
  .controller('mapController', function(Map){
    var vm = this;
    vm.showClearButtons = true;

    //Grab all the Surf Sessions from the User
    vm.displaySurfSession  = function(){
      Map.getLocations();
      vm.showClearButtons = !vm.showClearButtons

    };

    vm.removeSurfSessions = function(){
      Map.clearMap();
      vm.showClearButtons = true;

    };


  });
