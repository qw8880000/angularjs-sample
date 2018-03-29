(function () {
'use strict';

  angular
    .module('app.home')
    .controller('HomeController', HomeController);

  /* @ngInject */
  function HomeController($state,
    authenticationService) {

    var vm = this;
    vm.title = 'homeController';
    vm.logout = logout;

    ////////////////

    function logout() {
      $state.go('login');
      authenticationService.logout();
    }

  }
}());
