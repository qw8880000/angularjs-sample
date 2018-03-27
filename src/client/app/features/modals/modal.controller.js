(function () {
'use strict';

  angular
    .module('app.modals')
    .controller('ModalController', ModalController);

  /* @ngInject */
  function ModalController($ccwModalInstance, content) {
    var vm = this;
    vm.content = content;

    vm.ok = function () {
      $ccwModalInstance.close('ok');
    };

    vm.cancel = function () {
      $ccwModalInstance.dismiss('cancel');
    };

    vm.close = vm.cancel;
  }
}());
