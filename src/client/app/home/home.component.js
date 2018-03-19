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
    vm.isItemActive = isItemActive;
    vm.hasChildActive = hasChildActive;
    vm.logout = logout;

    ////////////////

    function logout() {
      $state.go('login');
      authenticationService.logout();
    }

    function isItemActive(srefName) {
      if ($state.is(srefName)) {
        return true;
      } else {
        return false;
      }
    }

    function hasChildActive(items) {
      if (angular.isArray(items)) {
        var currentSrefName = $state.$current.name;
        for(var i = 0; i < items.length; i++) {
          if(items[i].name === currentSrefName) {
            return true;
          }
        }
        return false;
      } else {
        return false;
      }
    }

  }

}());
