//surfCtrl.js

angular.module('surfCtrl', ['surfService'])
  //Surf Controller for the main page
  .controller('surfController', function(Surf){
    var vm = this;

    //Set up processing varible for spinner animation on load
    vm.processing = true;

    //Grab all the surf sessions from the User
    Surf.all()
      .success(function(data){
        //Remove processing when all surf sessions are loaded
        vm.processing = false;

        //bind ther surf sessions to vm.surfSessions
        vm.surfSessions = data;
      });//End surf list

    //Function to delete a surf session
    vm.deleteSurfSession = function(id){
      vm.processing = true;

      //accepts the surf id as a parameter
      Surf.delete(id)
        .success(function(data){
          //Return the list of surf sessions
          Surf.all()
            .success(function(data){
              vm.processing = false;
              vm.surfSessions = data;
            });
        });//End Delete
    };//End deleteSurfSession

  })//End surfController

  //Controller to use with edit surf page
  .controller('surfEditController', function($routeParams, Surf){
    var vm = this;
    //$routeParams grabs the surd id data from the URL
    Surf.get($routeParams.surf_id)
      .success(function(data){
        vm.surfData = data;
      });//End get single surf

    //Function to save the surf session
    vm.saveSurfSession = function(){
      vm.processing = true;
      vm.message = '';

      //Call the surfService to update the surf session
      Surf.update($routeParams.surf_id, vm.surfData)
        .success(function(data){
          vm.processing = false;

          //Clear the form
          vm.surfData = {};

          //bind the message from the api to vm.message
          console.log(data);
          vm.message = data.messsage;
        });

    };


  });//End surfEditController
