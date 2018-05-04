(function () {
  'use strict';

  angular
    .module('app.appVersion')
    .controller('AppVersionViewController', AppVersionViewController);

  /* @ngInject */
  function AppVersionViewController(dataService,
                                    $state,
                                    $stateParams) {

    var vm = this;
    vm.appVersionId = $stateParams.id;
    vm.appVersion = {};
    vm.cancel = cancel;
    vm.isForceUpdate = isForceUpdate;

    activate();

    ////////////////

    function activate() {
      getAppVersion();
    }

    function isForceUpdate(isForceUpdate) {
      return isForceUpdate == 0 || isForceUpdate == false ? '否' : '是';
    }

    function getAppVersion() {
      return dataService.AppVersion.get({
        'id': vm.appVersionId
      }, function (response) {
        if (response.ret === 0) {
          vm.appVersion = response.result;
        }
      });
    }

    function cancel() {
      $state.go('home.settings.app-version-manage');
    }

  }
}());
