//surfCtrl.js

angular.module('surfCtrl', ['surfService'])

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
      });
  });
