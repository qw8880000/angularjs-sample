(function () {
  'use strict';

  angular
    .module('app.customFilters')
    .controller('CustomFiltersController', CustomFiltersController);

  /* @ngInject */
  function CustomFiltersController() {
    var vm = this;
    vm.phoneDetail = {
      android: true,
      ios: false,
      camera: true,
      fm: false,
    };

  }

}());

