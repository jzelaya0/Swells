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
        .success(function(dataResponse){

          for (var i = 0; i < dataResponse.length; i++) {
            console.log(dataResponse[i]);

            var title = dataResponse[i].title;
            var latitude = dataResponse[i].latitude;
            var longitude = dataResponse[i].longitude;
            var comment = dataResponse[i].comment;

            var latLng = new google.maps.LatLng(latitude, longitude);

            //Set a new Marker for each location
            addMarker(latLng,title,comment);

          }//End for loop
          console.log(markers);
        });//End success
    };//End getLocations


      //Function to Set Markers on locations
      // ===================================
      // Adds a marker to the map and push to the array.
      function addMarker(location,title,comment) {
        var marker = new google.maps.Marker({
          position: location,
          map: map,
          title: title,
          comment: comment
        });
        var infoWindowContent = '<div class="alert alert-info"' +
            "<h2>" + marker.title + "</h2>" +
            "<p>" + marker.comment + "</p>" + "<div>";

        google.maps.event.addListener(marker, 'click', function(){
          infoWindow.setContent(infoWindowContent);
          infoWindow.open(map,marker);
        });


        markers.push(marker);
      }


      // =============================
      // Set map all markers in array
      // =============================
      function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
      }


      // =============================
      // Removes the Markers from the map only
      // =============================
      function clearMarkers() {
        setMapOnAll(null);
      }

      // =============================
      // Display any markers that are in the array
      // =============================
      function showMarkers() {
        setMapOnAll(map);
      }

      // =============================
      // Delete all markers in the array
      // =============================
      function deleteMarkers() {
        clearMarkers();
        markers = [];
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

        // This event listener will call addMarker() when the map is clicked.
          map.addListener('click', function(event) {
            addMarker(event.latLng);
            console.log(event.latLng);
            console.log('Markers:' + markers);
          });


      return mapFactory;
  });//End Map Factory
