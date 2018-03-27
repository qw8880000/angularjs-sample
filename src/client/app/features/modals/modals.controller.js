(function () {
'use strict';

  angular
    .module('app.modals')
    .controller('ModalsController', ModalsController);

  /* @ngInject */
  function ModalsController(ccwModal, $log) {
    var vm = this;
    vm.title = 'ModalsController';
    vm.open = open;
    vm.modalContent = 'hello world!!!';

    ////////////////

    function open() {
      var modalInstance = ccwModal.open({
        bodyClass: 'modal-open',
        templateUrl: 'app/features/modals/modal.template.html',
        controller: 'ModalController',
        controllerAs: 'vm',
        resolve: {
          content: function () {
            return vm.modalContent;
          },
        },
      });

      modalInstance.result.then(function () {
        $log.info('OK! Modal dismissed at: ' + new Date());
      }, function () {
        $log.info('Cancel! Modal dismissed at: ' + new Date());
      });

    }
  }
}());
