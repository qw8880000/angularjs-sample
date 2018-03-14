(function () {
  'use strict';

  angular
    .module('app.buttons')
    .component('buttons', {
      templateUrl: 'app/buttons/buttons.html',
      controller: buttonsController,
      controllerAs: 'vm',
    });

  /* @ngInject */
  function buttonsController() {
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
