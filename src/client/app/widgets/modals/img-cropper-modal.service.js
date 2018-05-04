(function () {
'use strict';

  angular
    .module('app.widgets')
    .factory('imgCropperModal', imgCropperModal);

  /* @ngInject */
  function imgCropperModal(ccwModal) {
    var service = {
      open: open
    };
    return service;

    ////////////////

    function open(params) {
      var modalInstance = ccwModal.open({
        bodyClass: 'modal-open',
        templateUrl: 'app/widgets/modals/img-cropper-modal.html',
        controller: imgCropperController,
        controllerAs: 'vm',
        resolve: {
          params: function () {
            return params;
          }
        },
      });

      return modalInstance.result;
    }

    /* @ngInject */
    function imgCropperController($ccwModalInstance, params) {
      var vm = this;
      vm.ok = ok;
      vm.cancel = cancel;
      vm.close = cancel;
      vm.croppedResult = null;
      vm.aspectRatio = params.aspectRatio;

      activate()

      //////////////////////////////////

      function activate() {
      }

      function ok() {
        $ccwModalInstance.close({
          croppedCanvas: vm.croppedResult.croppedCanvas,
          file: vm.croppedResult.file,
        });
      }

      function cancel() {
        $ccwModalInstance.dismiss('cancel');
      }

    }

  }
}());
