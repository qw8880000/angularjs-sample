(function () {
'use strict';

  angular
    .module('app.paginations')
    .controller('PaginationsController', PaginationsController);

  /* @ngInject */
  function PaginationsController() {
    var vm = this;
    vm.title = 'PaginationsController';
    vm.totalItems = 128;
    vm.itemsPerPage = 8
    vm.currentPage = 4;
    vm.maxSize = 5;


    ////////////////

  }
}());
