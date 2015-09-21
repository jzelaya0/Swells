//./public/app/controllers/mainCtrl.js
angular.module('mainCtrl', ['userService'])
  .controller('mainController', function($rootScope, $location, Auth){
    var vm = this;

    //get information if a person is logged in
    vm.loggedIn = Auth.isLoggedIn();

    //Check to see if a user is logged in on every request
    $rootScope.$on('$routeChangeStart', function(){
      vm.loggedIn = Auth.isLoggedIn();

      //get user information on a page load
      Auth.getUser()
        .then(function(data){
          vm.user = data.data;
        });
    });



    //function to handle login form
    vm.doLogin = function(){
      vm.processing = true;

      //Clear Error
      vm.error = '';

      //call the Auth.login() function
      Auth.login(vm.loginData.username, vm.loginData.password)
        .success(function(data){
          vm.processing = false;

          //if a user successfully logs in, redirect to user's home page
          if(data.success)
            $location.path('/home');
          else
            vm.error = data.message;
        });
    };//End doLogin

    //function to handle log out
    vm.doLogout = function(){
      Auth.logout();
      $location.path('/');
    };//End doLogout
  });//End mainCtrl
