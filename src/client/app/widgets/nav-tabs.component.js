(function () {
'use strict';

  angular
    .module('app.widgets')
    .component('navTabs', {
      templateUrl: 'app/widgets/nav-tabs.html',
      controller: navTabsController,
      controllerAs: 'vm',
      require: {
        ngModelCtrl: '?ngModel',
      }, // get a hold of NgModelController
      bindings: {
        navItems: '<',          // 必须
        navItemNameBy: '@',     // 必须
        orderBy: '@',
      }
    });

  /* @ngInject */
  function navTabsController($log, $scope) {
    var vm = this;
    var ngModelCtrl = null;
    vm.navClick = navClick;
    vm.currentNavItem = null;

    vm.$onInit = function () {
      // Note that the required controllers will not be available during the instantiation of the controller,
      // but they are guaranteed to be available just before the $onInit method is executed!
      ngModelCtrl = vm.ngModelCtrl;

      if (!ngModelCtrl) {
        $log.warn('component: ngModelCtrl is null');
        return; // do nothing if no ng-model
      }

      ngModelCtrl.$render = function () {
        $log.info('render');
        vm.currentNavItem = ngModelCtrl.$viewValue;
      };
      
      $scope.$watch('vm.currentNavItem', function (newValue, oldValue) {
        $log.info('$watch');
        ngModelCtrl.$setViewValue(newValue);
      });
    }

    function navClick(item) {
      $log.info('navClick');
      vm.currentNavItem = item;
    }

  }

}());
