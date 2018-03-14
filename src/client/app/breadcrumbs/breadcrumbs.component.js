(function () {
'use strict';

  angular
    .module('app.breadcrumbs')
    .component('breadcrumbs', {
      templateUrl: 'app/breadcrumbs/breadcrumbs.html',
      controller: breadcrumbsController,
      controllerAs: 'vm',
    });

  /* @ngInject */
  function breadcrumbsController() {
    var vm = this;
    vm.title = 'breadcrumbsController';
  }

}());
