(function () {
  'use strict';

  RepeatersController.$inject = ['$log', 'dataService'];
  angular
    .module('app.repeaters')
    .component('repeaters', {
      templateUrl: 'app/repeaters/repeaters.html',
      controller: RepeatersController,
      controllerAs: 'vm',
    });

  /* @ngInject */
  function RepeatersController($log, dataService) {
    var vm = this;
    vm.phones = null;

    activate();

    //////////////

    function activate() {
      getPhones();
    }

    function getPhones() {
      dataService.Phone.query({ phoneId: 'phones' }, function (phones) {
        $log.log(phones);
        vm.phones = phones;
      });
    }
  }

}());
