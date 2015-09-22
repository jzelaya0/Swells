//mapCtrl.js

angular.module('mapCtrl',['mapService'])
  .controller('mapController', function(Map){
    var vm = this;
    //Grab all the Surf Sessions from the User
    vm.displaySurfSession  = function(){
      Map.getLocations();

    }


  })


          //  //Create an event listener to place a new marker on the map
          //  map.addListener('click', function(e){
          //    console.log(e.latLng.H);//Log Latitude
          //    console.log(e.latLng.L);//Log Longitude
          //    placeMarkerAndPanTo(e.latLng, map);
          //  });
           //
          //  //Places a Marker and Pans to the Marker made
          //  function placeMarkerAndPanTo(latLng, map){
          //    var marker = new google.maps.Marker({
          //      position: latLng,
          //      map: map,
          //
          //    });
          //    map.panTo(latLng);
          //  }//end placeMarkerAndPanTo
