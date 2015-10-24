//surfReportController

angular.module('surfReportCtrl', ['surfReportService'])

  .controller('surfReportController', function(SurfReport){
    var vm = this;
    //Time of Day & Series for Chart
    vm.labels = ['12:00am', '3:00am', '6:00am', '9:00am', '12:00pm', '3:00pm', '6:00pm', '9:00pm'];
    vm.series = ['Significant Swell Height(m)', 'Swell Height(m)'];

    //Placeholder
    vm.data = [
      [65, 59, 80, 81, 56, 55, 40, 20],//Significant Swell Height
      [34, 23, 12, 12, 31, 123, 13, 20]//Swell Height
    ];

    vm.findReport = function(){
      SurfReport.getReport(vm.location)
        .success(function(data){
          //Set variable for returned data object
          var hourlyData = data.data.weather[0].hourly;
          //Empty array for significant swells height
          var sigSwellHeightArr = [];
          var swellHeight = [];

          //Loop through hourlyData to push sig swell ht to sigSwellHeightArr;
          for (var i = 0; i < hourlyData.length; i++) {
            var sigSwellResult = hourlyData[i].sigHeight_m;
            var swellResult = hourlyData[i].swellHeight_m;
            sigSwellHeightArr.push(sigSwellResult);
            swellHeight.push(swellResult);
          }

          //Set swell heights arrays to data array
          vm.data[0] = sigSwellHeightArr;
          vm.data[1] = swellHeight;
          console.log(data);
          console.log(sigSwellHeightArr);
          console.log(swellHeight);

        });//End Success
    };//End findReport
  });//End controller
