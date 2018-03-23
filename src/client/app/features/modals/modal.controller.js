(function () {
'use strict';

  angular
    .module('app.modals')
    .controller('ModalController', ModalController);

  /* @ngInject */
  function ModalController($uibModalInstance, content) {
    var vm = this;
    vm.content = content;

    vm.ok = function () {
      $uibModalInstance.close('ok');
    };

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
