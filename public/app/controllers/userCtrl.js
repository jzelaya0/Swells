//./public/app/controllers/userCtrl.js

angular.module('userCtrl',['userService'])

  //SIGN UP CTRL ================================
  //inject the User factory
  .controller('userCreateController', function($location, User){
    var vm = this;

    //Function that creates a new user
    vm.saveUser = function(){
      //For spinner animation when signing up
      vm.processing = true;

      //Use the create funciton in the userService
      User.create(vm.userData)
        .then(function(data){
          if(data.success){
            $location.path('/login');
          }else {
            console.log('error');
            vm.processing = false;
          }
        })
    }//End saveUser

  })//End userCreateController
