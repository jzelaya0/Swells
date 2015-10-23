//surfReportController

angular.module('surfReportCtrl', ['surfReportService'])

  .controller('surfReportController', function(SurfReport){
    var vm = this;

    vm.findReport = function(){

      SurfReport.getReport(vm.location)
        .success(function(data){
          console.log(data);
        });
    };
  })
