(function () {
'use strict';

  angular
    .module('app.datepickers')
    .controller('DatepickersController', DatepickersController);

  /* @ngInject */
  function DatepickersController() {
    var vm = this;
    vm.title = 'DatepickersController';
    vm.dt = new Date();
    vm.open = open;
    vm.popup = {};

    activate();

    ////////////////

    function activate() {
    }

    function open() {
      vm.popup.opened = true;
    }
  }
}());
