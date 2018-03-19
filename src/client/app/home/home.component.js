(function () {
'use strict';

  angular
    .module('app.home')
    .component('home', {
      templateUrl: 'app/home/home.html',
      controller: homeController,
      controllerAs: 'vm',
    });

  /* @ngInject */
  function homeController($state,
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
