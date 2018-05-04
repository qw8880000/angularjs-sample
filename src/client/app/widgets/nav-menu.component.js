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
                             accountService,
                             $state) {

    var vm = this;
    vm.title = 'NavMenuController';
    vm.navItems = [];
    vm.hasSubNav = hasSubNav;
    vm.toggleOpen = toggleOpen;
    vm.getNavClass = getNavClass;

    var agentType = accountService.getAgentType();

    activate();

    ////////////////

    function activate() {
      dataService.NavItems.get(function (navItems) {
        angular.forEach(navItems, function (navItem) {
          //
          // 根据url判断当前nav-item是否被选中，一般用于刷新后保持nav-item与url相对应
          if (isActive(navItem) || hasChildActive(navItem)) {
            navItem.isOpen = true;
          } else {
            navItem.isOpen = false;
          }

          //
          // 根据权限过滤显示的nav-item
          if (compareRoles(navItem.roles, agentType)) {
            var newSubItems = [];
            angular.forEach(navItem.subItems, function (subItem, index) {
              if(compareRoles(subItem.roles, agentType)) {
                newSubItems.push(subItem);
              }
            });

            navItem.subItems = newSubItems;
            vm.navItems.push(navItem);
          }

        });
      });
    }

    function compareRoles(roles, agentType) {
      if (angular.isUndefined(roles)) {
        return true;
      }

      if (angular.isArray(roles) && roles.indexOf(agentType) >= 0) {
        return true;
      } else {
        return false;
      }
    }

    //
    // nav
    //
    function toggleOpen(item) {
      //
      // 当前nav-item的sub-nav打开，其余的关闭
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
      if (item && angular.isArray(item.subItems) && item.subItems.length > 0) {
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
