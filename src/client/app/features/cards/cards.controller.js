(function () {
'use strict';

  angular
    .module('app.cards')
    .controller('CardsController', CardsController);

  /* @ngInject */
  function CardsController() {
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
