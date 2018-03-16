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
  function loginController() {
    var vm = this;
    vm.title = 'loginController';

    activate();

    ////////////////

    function activate() {
    }
  }

}());
