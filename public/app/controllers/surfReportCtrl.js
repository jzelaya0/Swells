//surfReportController

angular.module('surfReportCtrl', ['surfReportService'])

  .controller('surfReportController', function(SurfReport){
    var vm = this;
    //Time of Day & Series for Chart
    vm.labels = ['12:00am', '3:00am', '6:00am', '9:00am', '12:00pm', '3:00pm', '6:00pm', '9:00pm'];
    vm.series = ['Significant Swell Height(m)', 'Swell Height(m)'];

    //Placeholder for Swell Heights Chart
    vm.heightData = [
      [65, 59, 80, 81, 56, 55, 40, 20],//Significant Swell Height
      [34, 23, 12, 12, 31, 123, 13, 20]//Swell Height
    ];

    //Arrays for data response object properties
    var sigSwellHeightArr   = [];
    var swellHeightArr      = [];
    
    // GET SURF REPORT INFORMATION
    // ========================================
    vm.findReport = function(){
      SurfReport.getReport(vm.location)
        .success(function(dataResponse){
          var res = getSurfData(dataResponse);
          //Set swell height data to vm.heightData
          vm.heightData[0] = res.sigHeight;
          vm.heightData[1] = res.swellHeight;
        });//End Success
    };

    // Func to loop through dataResponse object's hourly array
    // ========================================
    function getSurfData(dataObj) {
      //Set object to hold array with data
      var swellsObj = {
        sigHeight: sigSwellHeightArr,
        swellHeight: swellHeightArr
      };

      //Set hourly propert to an array to loop through
      var array = dataObj.data.weather[0].hourly;
      //Loop through array and push all data needed to appropriate array
      for (var i = 0; i < array.length; i++) {
        sigSwellHeightArr.push(array[i].sigHeight_m);
        swellHeightArr.push(array[i].swellHeight_m);
      }

      //Return swell object with data from arrays
      return swellsObj;
    }//End getSurfData

  });//End controller
