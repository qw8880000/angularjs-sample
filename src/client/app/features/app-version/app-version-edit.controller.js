(function () {
  'use strict';

  angular
    .module('app.appVersion')
    .controller('AppVersionEditController', AppVersionEditController);

  /* @ngInject */
  function AppVersionEditController(dataService,
                                    dialogService,
                                    logger,
                                    $state,
                                    $stateParams) {

    var vm = this;
    vm.appVersionId = $stateParams.id;
    vm.appVersion = {};
    vm.appPlatform = null;
    vm.appType = null;
    vm.isEdit = isEdit;
    vm.submitAppForm = submitAppForm;
    vm.cancel = cancel;

    activate();

    ////////////////

    function activate() {
      if (isEdit()) {
        getAppVersion();
      }
    }

    //
    // Is edit or add
    //
    function isEdit() {
      return (vm.appVersionId !== null) ? true : false;
    }

    function getAppVersion() {
      return dataService.AppVersion.get({
        'id': vm.appVersionId
      }, function (response) {
        if (response.ret === 0) {
          vm.appVersion = response.result;
          vm.appType = vm.appVersion.app;
          vm.appPlatform = vm.appVersion.platform;
        }
      });
    }

    function submitAppForm(form) {
      var action;
      var params;

      if (form.$invalid) {
        logger.info('表单未填写完整');
        return;
      }

      params = {
        'notes': vm.appVersion.notes,
        'forceUpdate': !!vm.appVersion.forceUpdate,
        'versionCode': vm.appVersion.versionCode,
        'versionName': vm.appVersion.versionName,
        'url': vm.appVersion.url,
        'title':"新版本特性",
      };

      if (isEdit()) {
        action = dataService.AppVersion.set;
        params.platformId = vm.appVersion.platform.id;
        params.appId = vm.appVersion.app.appId;
        params.id = vm.appVersionId;
      } else {
        action = dataService.AppVersion.create;
        params.platformId = vm.appPlatform.id;
        params.appId = vm.appType.appId;
      }

      action(params, function (response) {
        if (response.ret === 0) {
          dialogService.alert('保存成功', function () {
            $state.go('home.settings.app-version-manage');
          });
        }
      });
    }

    function cancel() {
      $state.go('home.settings.app-version-manage');
    }

  }
}());
