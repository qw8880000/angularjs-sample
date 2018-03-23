(function () {
'use strict';

  angular
    .module('app.modals')
    .controller('ModalsController', ModalsController);

  /* @ngInject */
  function ModalsController($uibModal) {
    var vm = this;
    vm.title = 'ModalsController';
    vm.open = open;
    vm.modalContent = 'hello world!!!';

    ////////////////

    function open() {
      var modalInstance = $uibModal.open({
        // animation: false,
        // ariaLabelledBy: 'modal-title',
        // ariaDescribedBy: 'modal-body',
        template: 'aaaa'
        // templateUrl: 'app/features/modals/modal.template.html',
        // controller: 'ModalController',
        // controllerAs: 'vm',
        // resolve: {
          // content: function () {
            // return vm.modalContent;
          // }
        // },
      });

      // modalInstance.result.then(function () {
        // $log.info('OK! Modal dismissed at: ' + new Date());
      // }, function () {
        // $log.info('Cancel! Modal dismissed at: ' + new Date());
      // });

    }
  }
}());
