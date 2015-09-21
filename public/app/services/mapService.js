//mapService.js

//Inject surfService to use http requests for surf sessions
angular.module('mapService', ['surfService'])
  .factory('Map', function(Surf){
    //Create an empty mapService object;
    var mapService = {};

    var mapOptions = {
        center: new google.maps.LatLng(37.7831,-122.4039),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.TERRAIN
    };

    new google.maps.Map(document.getElementById('map'), mapOptions);

  })//End Map Factory
