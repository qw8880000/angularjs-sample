(function () {
'use strict';

  angular
    .module('app.login')
    .component('login', {
      templateUrl: 'app/login/login.html',
      controller: loginController,
      controllerAs: 'vm',
    });

  /* @ngInject */
  function loginController(authenticationService,
    $state) {
    var vm = this;
    vm.title = 'loginController';
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
