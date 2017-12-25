(function () {
  'use strict';

  angular
    .module('app.repeaters')
    .component('repeaters', {
      templateUrl: 'app/repeaters/repeaters.html',
      controller: RepeatersController,
    });

  function RepeatersController() {
    var vm = this;
    vm.phoneList = null;
  }

}());