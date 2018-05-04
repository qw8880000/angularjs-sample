(function () {
'use strict';

  angular
    .module('app.login')
    .controller('LoginController', LoginController);

  /* @ngInject */
  function LoginController(authenticationService,
                           appinfoService,
                           dialogService,
                           $stateParams,
                           $state) {

    var vm = this;
    vm.title = 'LoginController';
    vm.submit = submit;
    vm.username = null;
    vm.password = null;
    vm.uiConfig = {
      copyright: appinfoService.uiConfig.copyright || null,
    };
    vm.passwordForget = passwordForget;

    activate();

    ////////////////

    function activate() {
      if ($stateParams.isTokenExpired) {
        dialogService.alert('登陆超时，请重新登陆！');
      }
    }

    function submit() {
      authenticationService.login(vm.username, vm.password, function () {
        $state.go('home.dashboard');
      });
    }
    
    function passwordForget() {
      $state.go('password-forget');
    }

  }

}());

