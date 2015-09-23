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

    //Clear all surf session markers from the map
    vm.removeSurfSessions = function(){
      Map.clearMap();
      vm.showClearButtons = true;

    };

    //Submit form for a new surf session
    vm.surfForm = function(surfdata){
      //Grab surf data from from form
      //Send to mapService to POST
      Map.addLocation(vm.surfData)


    }


  });
