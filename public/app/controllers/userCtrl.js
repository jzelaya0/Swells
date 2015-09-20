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

      //Clear the Message
      vm.message = '';

      //Clear the login message
      vm.login = ''

      //Use the create funciton in the userService
      User.create(vm.userData)
        .success(function(data){
          vm.processing = false;
            console.dir(data);
            if(data.success === false){
              //Show message if user is created successfully or not
              vm.message = data.message;
            console.log('Duplicate username');
            }
            else{
              vm.login = data.message;
              console.log('Ready to login');
            }

            //Clear the form
            vm.userData = {};

        });//End success
    };//End saveUser

  })//End userCreateController
