(function () {
  'use strict';

  angular
    .module('app.customFilters')
    .component('customFilters', {
      templateUrl: 'app/custom-filters/custom-filters.html',
      controller: CustomFiltersController,
      controllerAs: 'vm',
    });

  /* @ngInject */
  function CustomFiltersController($log, dataService) {
    var vm = this;
    vm.phoneDetail = '';

    activate();

    //////////////////////////

    function activate() {
      getPhoneDetail('nexus-s');
    }

    function getPhoneDetail(phoneId) {
      dataService.Phone.get({ phoneId: phoneId }, function (detail) {
        vm.phoneDetail = detail;
        $log.log(detail);
      });
    }

  }

}());

