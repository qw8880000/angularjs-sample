(function () {
'use strict';

  angular
    .module('app.paginations')
    .controller('PaginatiosController', PaginatiosController);

  /* @ngInject */
  function PaginatiosController() {
    var vm = this;
    vm.title = 'PaginatiosController';
    vm.totalItems = 128;
    vm.itemsPerPage = 8
    vm.currentPage = 4;
    vm.maxSize = 5;


    ////////////////

  }
}());
