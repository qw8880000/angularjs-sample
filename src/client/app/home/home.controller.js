(function () {
'use strict';

  angular
    .module('app.home')
    .controller('homeController', homeController);

  /* @ngInject */
  function homeController($state,
    navItems,
    $log,
    authenticationService) {

    var vm = this;
    vm.title = 'homeController';
    vm.isActive = isActive;
    vm.hasChildActive = hasChildActive;
    vm.hasSubNav = hasSubNav;
    vm.logout = logout;
    vm.navItems = navItems;

    ////////////////

    function logout() {
      $state.go('login');
      authenticationService.logout();
    }

    function isActive(srefName) {
      if ($state.is(srefName)) {
        return true;
      } else {
        return false;
      }
    }

    function hasChildActive(item) {
      if (item && item.subItems && angular.isArray(item.subItems)) {
        var currentSrefName = $state.$current.name;
        var subItems = item.subItems;

        for(var i = 0; i < subItems.length; i++) {
          if(subItems[i].sref === currentSrefName) {
            return true;
          }
        }
        return false;
      } else {
        return false;
      }
    }

    function hasSubNav(item) {
      if (item && item.subItems && angular.isArray(item.subItems)) {
        return true;
      } else {
        return false;
      }
    }

  }
}());
