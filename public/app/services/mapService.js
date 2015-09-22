//mapService.js

//Inject surfService to use http requests for surf sessions
angular.module('mapService', ['surfService'])
  .factory('Map', function(Surf){
    //Create an empty mapService object;
    var mapFactory = {};
    var markers = [];

    //Get all Surf Session locations from Ajax Requst
    mapFactory.getLocations = function(){
      Surf.all()
        .success(function(event){
          for (var i = 0; i < event.length; i++) {
            console.log(event[i]);

            var title = event[i].title;
            var latitude = event[i].latitude;
            var longitude = event[i].longitude;

            var latLng = new google.maps.LatLng(latitude, longitude);

            //Set a new Marker for each location
            setMarker(latLng);
          }
        });//End success
    };//End getLocations


      //Function to Set Markers on locations
      // ===================================
      function setMarker(location, title){
        var newMarker = new google.maps.Marker({
          position: location,
          map: map,
          title: title
        })
      }


      // =============================================
      // Initialize the Map
      // =============================================
        //Create options for the map
        var mapOptions = {
            center: new google.maps.LatLng(37.7831,-122.4039),
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.TERRAIN
        };

        map = new google.maps.Map(document.getElementById('map'),
        mapOptions);




      return mapFactory;
  });//End Map Factory
