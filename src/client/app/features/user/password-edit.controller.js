(function () {
'use strict';

  angular
    .module('app.user')
    .controller('PasswordEditController', PasswordEditController);

  /* @ngInject */
  function PasswordEditController(dataService,
                                  md5,
                                  dialogService) {
    var vm = this;
    vm.oldPassword = null;
    vm.newPassword = null;
    vm.newPasswordAgain = null;
    vm.setPassword = setPassword;

    activate();

    ////////////////

    function activate() {
    }

    function setPassword(form) {
      if (form.$invalid) {
        return;
      }

      if (vm.newPassword != vm.newPasswordAgain) {
        dialogService.alert("两次新密码不一致");
        return;
      }

      dataService.Password.set({
        'oldPassword': md5.generate16(vm.oldPassword),
        'newPassword': md5.generate16(vm.newPassword),
      }, function (response) {
        if (response.ret === 0) {
          dialogService.alert('修改成功');
        }
      });
    }

  }
}());
