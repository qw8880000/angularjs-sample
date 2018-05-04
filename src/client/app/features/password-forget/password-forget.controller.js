(function () {
'use strict';

  angular
    .module('app.passwordForget')
    .controller('PasswordForgetController', PasswordForgetController);

  /* @ngInject */
  function PasswordForgetController(dataService,
                                    md5,
                                    $interval,
                                    $state,
                                    dialogService) {
    var vm = this;
    vm.title = 'PasswordForgetController';
    vm.phone = null;
    vm.verifyPicCode = null;
    vm.verifyPicUrl = null;
    vm.verifyCode = null;
    vm.newPassword = null;
    vm.newPasswordAgain = null;
    vm.resetPassword = resetPassword;
    vm.getVerifyCode = getVerifyCode;
    vm.getVerifyPic = getVerifyPic;
    vm.isShowCountDown = false;
    vm.countDown = null;
    vm.cancel = cancel;

    activate();

    ////////////////

    function activate() {
      getVerifyPic();
    }

    function getVerifyPic() {
      dataService.VerifyPic.get({
        // 'width': 100,
        // 'height': 38,
        'len': 4
      }, function (response) {

      });
    }

    function checkVerifyPic() {
      if (vm.verifyPicCode === null) {
        dialogService.alert('请输入图形验证码');
        return;
      }

      dataService.VerifyPic.check({
        'code': vm.verifyPicCode,
      }, function (response) {

      });
    }

    function getVerifyCode() {
      if (vm.phone === null) {
        dialogService.alert('请输入手机号');
        return;
      }
      if (vm.verifyPicCode === null) {
        dialogService.alert('请输入图形验证码');
        return;
      }

      dataService.VerifyCode.get({
        'phone': vm.phone,
        'code': vm.verifyPicCode,
        'type': 1
      }, function (response) {
        if (response.ret === 0) {
          showCountDown();
        }
      });
    }

    function showCountDown() {
      vm.isShowCountDown = true;
      var count = 60;
      $interval(function () {
        count--;
        if (count === 0) {
          vm.isShowCountDown = false;
        } else {
          vm.countDown = count + '秒后可重发'
        }
      }, 1000, 61);
    }

    function resetPassword(form) {
      if (form.$invalid) {
        return;
      }

      if (vm.newPassword != vm.newPasswordAgain) {
        dialogService.alert('两次密码输入不一致');
        return;
      }

      dataService.Password.reset({
        'phone': vm.phone,
        'verifyCode': vm.verifyCode,
        'password': md5.generate16(vm.newPassword),
      }, function (response) {
        if (response.ret === 0) {
          dialogService.alert('重置成功');
        }
      });
    }

    function cancel() {
      $state.go('login');
    }

  }
}());
