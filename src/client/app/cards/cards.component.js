(function () {
'use strict';

  angular
    .module('app.cards')
    .component('cards', {
      templateUrl: 'app/cards/cards.html',
      controller: cardsController,
      controllerAs: 'vm',
    });

  /* @ngInject */
  function cardsController() {
    var vm = this;
    vm.title = 'cardsController';
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
