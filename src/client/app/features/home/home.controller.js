(function () {
'use strict';

  angular
    .module('app.home')
    .controller('HomeController', HomeController);

  /* @ngInject */
  function HomeController($state,
    navItems,
    authenticationService) {

    var vm = this;
    vm.title = 'homeController';
    vm.logout = logout;
    // 
    // nav
    //
    vm.navItems = [];
    vm.hasSubNav = hasSubNav;
    vm.toggleOpen = toggleOpen;
    vm.getNavClass = getNavClass;

    activate();

    ////////////////

    function activate() {
      angular.forEach(navItems, function (navItem) {
        if (isActive(navItem) || hasChildActive(navItem)) {
          navItem.isOpen = true;
        } else {
          navItem.isOpen = false;
        }
        vm.navItems.push(navItem);
      });
    }

    function logout() {
      $state.go('login');
      authenticationService.logout();
    }

    //
    // nav
    //
    function toggleOpen(item) {
      item.isOpen = !item.isOpen;

      angular.forEach(vm.navItems, function (navItem) {
        if (item !== navItem) {
          navItem.isOpen = false;
        }
      });
    }

    function isActive(item) {
      if ($state.is(item.sref)) {
        return true;
      } else {
        return false;
      }
    }

    function hasChildActive(item) {
      if (hasSubNav(item)) {
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

    function getNavClass(item) {
      var navClass = [];

      if (isActive(item) || hasChildActive(item)) {
        navClass.push('js-nav__item--active');
      }

      if (item.isOpen) {
        navClass.push('js-nav__item--open');
      }

      return navClass;
    }

  }
}());
