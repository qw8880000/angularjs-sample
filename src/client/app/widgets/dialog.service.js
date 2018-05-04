(function () {
'use strict';

  angular
    .module('app.widgets')
    .factory('dialogService', dialogService);

  /* @ngInject */
  function dialogService(ccwModal) {
    var service = {
      confirm: confirm,
      prompt: prompt,
      alert: alert,
    };
    return service;

    ////////////////

    function confirm(message, ok, cancel) {
      return open('confirm', message, ok, cancel);
    }

    function prompt(message, ok, cancel) {
      return open('prompt', message, ok, cancel);
    }

    function alert(message, ok) {
      return open('alert', message, ok);
    }

    //
    // @return promise
    function open(type, message, ok, cancel) {

      var modalInstance = ccwModal.open({
        bodyClass: 'modal-open',
        templateUrl: 'app/widgets/dialog.html',
        controller: dialogController,
        controllerAs: 'vm',
        resolve: {
          message: function () {
            return message;
          },

          type: function () {
            return type;
          },
        },
      });

      modalInstance.result.then(function (userInput) {
        if (angular.isFunction(ok)) {
          ok(userInput);
        }
      }, function () {
        if (angular.isFunction(cancel)) {
          cancel();
        }
      });

      return modalInstance.result;
    }

    /* @ngInject */
    function dialogController($ccwModalInstance, type, message) {
      var vm = this;
      vm.type = type || 'confirm';
      vm.message = message;
      vm.userInput = '';
      vm.ok = ok;
      vm.cancel = cancel;
      vm.close = cancel;

      //////////////////////////////////

      function ok() {
        $ccwModalInstance.close(vm.userInput);
      }

      function cancel() {
        $ccwModalInstance.dismiss('cancel');
      }
    }

  }
}());
