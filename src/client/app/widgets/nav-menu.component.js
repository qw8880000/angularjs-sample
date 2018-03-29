(function () {
'use strict';

  angular
    .module('app.widgets')
    .component('navMenu', {
      templateUrl: 'app/widgets/nav-menu.html',
      controller: NavMenuController,
      controllerAs: 'vm',
    });

  /* @ngInject */
  function NavMenuController(dataService,
    $state) {

    var vm = this;
    vm.title = 'NavMenuController';
    vm.navItems = [];
    vm.hasSubNav = hasSubNav;
    vm.toggleOpen = toggleOpen;
    vm.getNavClass = getNavClass;

    activate();

    ////////////////

    function activate() {
      dataService.navItems.query(function (navItems) {
        angular.forEach(navItems, function (navItem) {
          if (isActive(navItem) || hasChildActive(navItem)) {
            navItem.isOpen = true;
          } else {
            navItem.isOpen = false;
          }
          vm.navItems.push(navItem);
        });
      });
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

        if (currentSrefName.indexOf(item.sref) !== -1) {
          return true;
        } else {
          return false;
        }
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
