//mapService.js

//Inject surfService to use http requests for surf sessions
angular.module('mapService', ['surfService'])
  .factory('Map', function(Surf){
    //Create an empty mapService object;
    var mapFactory = {};
    var markers = [];
    var infoWindow = new google.maps.InfoWindow();

    //Get all Surf Session locations from Ajax Requst
    mapFactory.getLocations = function(){
      Surf.all()
        .success(function(event){

          for (var i = 0; i < event.length; i++) {
            console.log(event[i]);

            var title = event[i].title;
            var latitude = event[i].latitude;
            var longitude = event[i].longitude;
            var comment = event[i].comment;

            var latLng = new google.maps.LatLng(latitude, longitude);


            //Set a new Marker for each location
            setMarker(latLng, title, comment);


          }//End for loop
        });//End success
    };//End getLocations


      //Function to Set Markers on locations
      // ===================================
      function setMarker(location, title, comment){
        var newMarker = new google.maps.Marker({
          position: location,
          map: map,
          title: title,
          comment: comment
        });

        var infoWindowContent = '<div class="alert alert-info"' +
            "<h2>" + newMarker.title + "</h2>" +
            "<p>" + newMarker.comment + "</p>" + "<div>";

        google.maps.event.addListener(newMarker, 'click', function(){
          infoWindow.setContent(infoWindowContent);
          infoWindow.open(map,newMarker);
        });


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


        //Event Listener That logs Lat and Long on click
        google.maps.event.addListener(map, 'click', function(e){
          console.log(e.latLng);
        });




      return mapFactory;
  });//End Map Factory
