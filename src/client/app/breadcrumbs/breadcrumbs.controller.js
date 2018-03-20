(function () {
'use strict';

  angular
    .module('app.breadcrumbs')
    .controller('BreadcrumbsController', BreadcrumbsController);

  /* @ngInject */
  function BreadcrumbsController() {
    var vm = this;
    vm.title = 'breadcrumbsController';
  }

}());
