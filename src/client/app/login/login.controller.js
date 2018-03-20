(function () {
'use strict';

  angular
    .module('app.login')
    .controller('LoginController', LoginController);

  /* @ngInject */
  function LoginController(authenticationService,
    $state) {
    var vm = this;
    vm.title = 'LoginController';
    vm.submit = submit;
    vm.username = null;
    vm.password = null;

    ////////////////

    function submit() {
      authenticationService.login(vm.username, vm.password, function () {
        $state.go('home.dashboard');
      });
    }
  }

}());

