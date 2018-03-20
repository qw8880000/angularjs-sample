(function () {
  'use strict';

  angular
    .module('app.buttons')
    .controller('ButtonsController', ButtonsController);

  /* @ngInject */
  function ButtonsController() {
    var vm = this;
    vm.title = 'buttonsController';
    vm.themes = [
      'primary',
      'secondary',
      'light',
      'gray',
      'dark',
      'green',
      'cyan',
      'yellow',
      'red',
    ];
  }

}());
