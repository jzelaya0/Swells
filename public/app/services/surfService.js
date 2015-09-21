//surfService.js

angular.module('surfService', [])

  .factory('Surf', function($http){
    //Create an empty surfFactory object
    var surfFactory = {};

    //get a single surf session from a user
    surfFactory.get = function(id){
      return $http.get('/api/surf/' + id);
    };

    //get all surf seesions from a single user
    surfFactory.all = function(){
      return $http.get('/api/surf/');
    };

    //create a new surf session
    surfFactory.create = function(surfData){
      return $http.post('/api/surf/', surfData);
    };

    //update a surf session for a single user
    surfFactory.update = function(id, surfData){
      return $http.put('/api/surf/' + id, surfData);
    };

    surfFactory.delete = function(id){
      return $http.delete('/api/surf/' + id);
    };

    //return the surfFactory object
    return surfFactory;

  });//End surfFactory
