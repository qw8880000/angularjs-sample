(function () {
'use strict';

  angular
    .module('app.widgets')
    .component('pagination', {
      templateUrl: 'app/widgets/pagination.html',
      controller: paginationController,
      controllerAs: 'vm',
      require: {
        ngModelCtrl: '?ngModel',
      }, // get a hold of NgModelController
      bindings: {
        itemsPerPage: '=',
        totalItems: '=',
        //pageChange: '=',
      },
    });

  /* @ngInject */
  function paginationController($scope,
                                $log) {
    var vm = this;
    var ngModelCtrl = null;
    vm.currentPage = null;
    vm.selectPage = selectPage;

    vm.$onInit = function () {
      // Note that the required controllers will not be available during the instantiation of the controller,
      // but they are guaranteed to be available just before the $onInit method is executed!
      ngModelCtrl = vm.ngModelCtrl;

      if (!ngModelCtrl) {
        $log.warn('component: ngModelCtrl is null');
        return; // do nothing if no ng-model
      }

      // viewValue to modelValue
      ngModelCtrl.$render = function () {
        vm.currentPage = ngModelCtrl.$viewValue;
      };

      // modelValue to viewValue
      $scope.$watch('vm.currentPage', function (newValue, oldValue) {
        ngModelCtrl.$setViewValue(newValue);
      });
    }

    function selectPage(page) {
      vm.currentPage = page;
    }
  }

}());
