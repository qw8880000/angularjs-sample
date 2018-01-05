(function () {
  'use strict';

  angular
    .module('app.toastrs')
    .component('toastrs', {
      templateUrl: '',
      controller: toastrsController,
      controllerAs: 'vm',
    });

  /* @ngInject */
  function toastrsController() {
    var vm = this;
    vm.title = 'toastrsController';

    activate();

    ////////////////

    function activate() {
    }
  }

}());
