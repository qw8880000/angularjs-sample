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

    activate();

    ////////////////

    function activate() {
    }
  }
}());
