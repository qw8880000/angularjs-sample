(function () {
  'use strict';

  angular
    .module('app.repeaters')
    .controller('RepeatersController', RepeatersController);

  /* @ngInject */
  function RepeatersController($log,
    dataService) {

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
