//surfReportController

angular.module('surfReportCtrl', ['surfReportService'])

  .controller('surfReportController', function(SurfReport){
    var vm = this;
    //Time of Day & Swell Series for Chart
    vm.swellLabels = ['12:00am', '3:00am', '6:00am', '9:00am', '12:00pm', '3:00pm', '6:00pm', '9:00pm'];
    vm.swellSeries = ['Significant Swell Height(m)', 'Swell Height(m)'];
    //Time of Day & Temp Series for Chart
    vm.tempLabels = ['12:00am', '3:00am', '6:00am', '9:00am', '12:00pm', '3:00pm', '6:00pm', '9:00pm'];
    vm.tempSeries = ['Air Temp.(C)', 'Air Temp.(F)'];
    //Time of Day & Water Temp Series for Chart
    vm.waterTempLabels = ['12:00am', '3:00am', '6:00am', '9:00am', '12:00pm', '3:00pm', '6:00pm', '9:00pm'];
    vm.waterTempSeries = ['Water Temp.(C)', 'Water Temp.(F)'];

    //Color for Charts
    vm.swellColors = ['#116498', '#119698']
    vm.tempColors = ['#FF5252', '#FF8A80'];
    vm.waterTempColors = ['#49CBC8', '#4A96CD'];

    //Placeholder for Swell Heights Chart
    vm.heightData = [
      [65, 59, 80, 81, 56, 55, 40, 20],//Significant Swell Height
      [34, 23, 12, 12, 31, 123, 13, 20]//Swell Height
    ];
    //Placeholder for Swell Heights Chart
    vm.tempData = [
      [65, 59, 80, 81, 56, 55, 40, 20],//Significant Swell Height
      [34, 23, 12, 12, 31, 123, 13, 20]//Swell Height
    ];
    //Placeholder for Swell Heights Chart
    vm.waterTempData = [
      [65, 59, 80, 81, 56, 55, 40, 20],//Significant Swell Height
      [34, 23, 12, 12, 31, 123, 13, 20]//Swell Height
    ];

    //Arrays for data response object properties
    var sigSwellHeightArr   = [];
    var swellHeightArr      = [];
    var tempCelArr          = [];
    var tempFahArr          = [];
    var waterTempCelArr     = [];
    var waterTempFahArr     = [];


    // GET SURF REPORT INFORMATION
    // ========================================
    vm.findReport = function(){
      SurfReport.getReport(vm.location)
        .success(function(dataResponse){
          var data = getSurfData(dataResponse);
          //Set swell height data to vm.heightData
          vm.heightData[0]    = data.sigHeight;
          vm.heightData[1]    = data.swellHeight;
          vm.tempData[0]      = data.tempC;
          vm.tempData[1]      = data.tempF;
          vm.waterTempData[0] = data.waterTempC;
          vm.waterTempData[1] = data.waterTempF;

        });//End Success
    };

    // Func to loop through dataResponse object's hourly array
    // ========================================
    function getSurfData(dataObj) {
      //Set object to hold array with data
      var swellsObj = {
        sigHeight     : sigSwellHeightArr,
        swellHeight   : swellHeightArr,
        tempC         : tempCelArr,
        tempF         : tempFahArr,
        waterTempC    : waterTempCelArr,
        waterTempF    : waterTempFahArr
      };

      //Set hourly propert to an array to loop through
      var array = dataObj.data.weather[0].hourly;
      //Loop through array and push all data needed to appropriate array
      for (var i = 0; i < array.length; i++) {
        sigSwellHeightArr.push(array[i].sigHeight_m);
        swellHeightArr.push(array[i].swellHeight_m);
        tempCelArr.push(array[i].tempC);
        tempFahArr.push(array[i].tempF);
        waterTempCelArr.push(array[i].waterTemp_C);
        waterTempFahArr.push(array[i].waterTemp_F);
      }

      //Return swell object with data from arrays
      return swellsObj;
    }//End getSurfData

  });//End controller
