(function () {
'use strict';

  angular
    .module('app.user')
    .controller('UserEditController', UserEditController);

  /* @ngInject */
  function UserEditController(dataService,
                              imgCropperModal,
                              dialogService,
                              imgUpload,
                              $scope,
                              $sessionStorage,
                              SESSIONSTORAGE,
                              accountService) {
    var vm = this;
    vm.title = 'UserEditController';
    vm.user = null;
    vm.userAvatarSelect = userAvatarSelect;
    vm.setUserInfo = setUserInfo;

    var isUserAvatarChanged = false;
    var userAvatarCanvas = null;
    var userAvatarFileName = null;

    activate();

    ////////////////

    function activate() {
      getUserInfo();
    }

    function getUserInfo() {
      vm.user = angular.copy(accountService.userInfo);
    }

    function setUserInfo(userForm) {
      if (userForm.$invalid) {
        return;
      }

      if (isUserAvatarChanged) {
        userAvatarUpload().then(function () {
          submitDate();
        });
      } else {
        submitDate();
      }
    }

    function submitDate() {
      var params = {
        'email': vm.user.email,
        'gender': vm.user.gender,
        'nick': vm.user.nick,
        'headUrl': vm.user.headUrl
      };

      dataService.UserInfo.set(params, function (response) {
        if (response.ret === 0) {
          //
          // save
          accountService.setUserInfo(vm.user);
          $sessionStorage.put(SESSIONSTORAGE.USERINFO, vm.user);

          //
          //
          $scope.$emit('updatedUserInfo', {
            'nick': vm.user.nick,
            'headUrl': vm.user.headUrl
          });
          dialogService.alert('保存成功');
        }
      });
    }

    function userAvatarSelect() {
      imgCropperModal.open({
        aspectRatio: 1 / 1,
      }).then(function (result) {
        if (result) {
          isUserAvatarChanged = true;
          userAvatarCanvas = result.croppedCanvas;
          userAvatarFileName = result.file.name;
          //
          // show cropped image
          vm.user.headUrl = result.croppedCanvas.toDataURL();
        }
      }, function () {
        // 消除 Possibly unhandled rejection: undefined
      });
    }

    function userAvatarUpload() {
      return imgUpload.upload(userAvatarCanvas, 'img', userAvatarFileName, function (res) {
        vm.user.headUrl = res.url;
      });
    }

  }
}());
