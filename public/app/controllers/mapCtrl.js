//mapCtrl.js

angular.module('mapCtrl',['surfService'])
  .controller('mapController', function(Surf){
    var vm = this;
    var markers = [];
    var newMarker = null;
    var infoWindow = new google.maps.InfoWindow();

    // =============================
    // Get all Surf Session locations from Ajax Requst
    // =============================
    vm.displaySurfSessions  = function(){
      //If there are no markers in the array, then display the collection
      if(markers.length === 0){
        Surf.all()
          .success(function(dataResponse){
            //Loop through the database objects
            for (var i = 0; i < dataResponse.length; i++) {
              console.log(dataResponse[i]);
              //Set properties of objects into varibles for later use
              var title = dataResponse[i].title;
              var latitude = dataResponse[i].latitude;
              var longitude = dataResponse[i].longitude;
              var comment = dataResponse[i].comment;
              //Set the latitude and longitude
              var latLng = new google.maps.LatLng(latitude, longitude);

              //Set a new Marker for each location
              addMarker(latLng,title,comment);


            }//End for loop
            console.log('Markers',markers);
          });//End success
        }else {
          //Marker Must Be Removed
          vm.removeMarker = "Clear Map First!";
        }

    };

    // =============================
    // Clear The Map locations
    // =============================
    // Clears the Map of Markers and markers array
    // Clear all surf session markers from the map
    vm.removeSurfSessions = function(){
      deleteMarkers();
      console.log(markers);
    };

    // =============================
    // Submit form for a new surf session
    // =============================
    // Save the current marker as a new surf session
    vm.saveSurfSession = function(){
      //Spinner animation
      vm.processing = true;

      //Message to display on succesful post
      vm.message = '';

      //Set the new marker's coordinates to pass to the create function
      vm.surfData.latitude = newMarker.latitude;
      vm.surfData.longitude = newMarker.longitude;

      //Create a new surf session from surfService
      Surf.create(vm.surfData)
          .success(function(data){
            //Spinning animation on click
            vm.processing = false;
            //Assign alert from server response
            vm.alert = data.message;
            //Clear the Form on success
            vm.surfData = {};
            //Clear the map on success
            deleteMarkers();
          });
    };

    // =============================
    // Alert Messages for Forms
    // =============================
    vm.alert = ''; //For Form alert messages
    vm.removeMarker = ''; //Remove Marker Before seeing sessions

    vm.closeAlert = function(index) {
      vm.alert = '';
      vm.removeMarker= '';
    };


    // =======================================================================================
    // GOOGLE MAPS CONFIG
    // =======================================================================================

    //BLUE WATER MAP STYLE
    var styles =  [
          {
              "featureType": "administrative",
              "elementType": "labels.text.fill",
              "stylers": [
                  {
                      "color": "#444444"
                  }
              ]
          },
          {
              "featureType": "landscape",
              "elementType": "all",
              "stylers": [
                  {
                      "color": "#f2f2f2"
                  }
              ]
          },
          {
              "featureType": "poi",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "road",
              "elementType": "all",
              "stylers": [
                  {
                      "saturation": -100
                  },
                  {
                      "lightness": 45
                  }
              ]
          },
          {
              "featureType": "road.highway",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "simplified"
                  }
              ]
          },
          {
              "featureType": "road.arterial",
              "elementType": "labels.icon",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "transit",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "water",
              "elementType": "all",
              "stylers": [
                  {
                      "color": "#46bcec"
                  },
                  {
                      "visibility": "on"
                  }
              ]
          }
      ];



    // =============================
    // Function to Set Markers on locations
    // =============================
    // Adds a marker to the map and push to the array.
    function addMarker(location,title,comment) {
      var marker = new google.maps.Marker({
        position: location,
        map: map,
        title: title,
        comment: comment
      });
      //Set the Lat & Lng of the new marker to use in saveSurfSession()
      newMarker = {latitude: marker.position.H , longitude: marker.position.L};
      map.panTo(location);
      console.log('NewMarker',newMarker);

      //Set the IW Content for each marker
      var infoWindowContent = '<div class="alert alert-info"' +
          "<h2>" + marker.title + "</h2>" +
          "<p>" + marker.comment + "</p>" + "<div>";

      //Create a new click event listerner for each marker
      google.maps.event.addListener(marker, 'click', function(){
        infoWindow.setContent(infoWindowContent);
        infoWindow.open(map,marker);
      });

      //Push the new marker into the markers array
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
          styles: styles,
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.TERRAIN
      };
      //Create a new google map
      map = new google.maps.Map(document.getElementById('map'),
      mapOptions);


      // This event listener will call addMarker() when the map is clicked.
        google.maps.event.addListener(map,'click', function(event) {
          // Allow for one marker to be placed at a time
            if(markers.length === 0){
              addMarker(event.latLng);
              console.log('Markers',markers);
            }else {
              // Tell User to Clear the Map
              alert('Clear Map');
            }
        });

        // // HTML5 geolocation - Will auto position to user's locaitons
        // if (navigator.geolocation) {
        //   navigator.geolocation.getCurrentPosition(function(position) {
        //     var pos = {
        //       lat: position.coords.latitude,
        //       lng: position.coords.longitude
        //     };
        //     map.setCenter(pos);
        //   }, function() {
        //     handleLocationError(true, infoWindow, map.getCenter());
        //   });
        //   } else {
        //     // Browser doesn't support Geolocation
        //     handleLocationError(false, infoWindow, map.getCenter());
        //   }
        //
        //
        // function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        //   infoWindow.setPosition(pos);
        //   infoWindow.setContent(browserHasGeolocation ?
        //                         'Error: The Geolocation service failed.' :
        //                         'Error: Your browser doesn\'t support geolocation.');
        // }

  });//End mapController
