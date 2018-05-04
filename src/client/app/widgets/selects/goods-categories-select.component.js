(function () {
'use strict';

  angular
    .module('app.widgets')
    .component('goodsCategoriesSelect', {
      templateUrl: 'app/widgets/selects/goods-categories-select.html',
      controller: goodsCategoriesSelectController,
      controllerAs: 'vm',
      require: {
        ngModelCtrl: '?ngModel',
      }, // get a hold of NgModelController
      bindings: {
      },
    });

  /* @ngInject */
  function goodsCategoriesSelectController(dataService,
                                           $scope,
                                           $log) {
    var vm = this;
    vm.goodsCategories = [];
    vm.goodsCategory = null;
    var ngModelCtrl = null;

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
        vm.goodsCategory = ngModelCtrl.$viewValue;
      };

      // modelValue to viewValue
      $scope.$watch('vm.goodsCategory', function (newValue, oldValue) {
        ngModelCtrl.$setViewValue(newValue);
      });

      getGoodsCategories();
    }

    function getGoodsCategories() {
      dataService.GoodsCategories.get({}, function (response) {
        if (response.ret === 0) {
          vm.goodsCategories = response.result;
        }
      });
    }
  }

}()); 
