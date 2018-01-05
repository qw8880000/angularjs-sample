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
    vm.phoneDetail = {
      android: true,
      ios: false,
      camera: true,
      fm: false,
    };

  }

}());

