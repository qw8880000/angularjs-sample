(function () {
  'use strict';

  angular
    .module('app.widgets')
    .component('appTypesSelect', {
      templateUrl: 'app/widgets/selects/app-types-select.html',
      controller: appTypesSelectController,
      controllerAs: 'vm',
      require: {
        ngModelCtrl: '?ngModel',
      }, // get a hold of NgModelController
      bindings: {
        required: '<',
        disabled: '<',
        initialAppid: '<',
        name: '@'
      },
    });

  /* @ngInject */
  function appTypesSelectController(dataService,
                                    $scope,
                                    $log) {
    var vm = this;
    vm.appTypes = [];
    vm.appType = null;
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
        vm.appType = ngModelCtrl.$viewValue;
      };

      // modelValue to viewValue
      $scope.$watch('vm.appType', function (newValue, oldValue) {
        ngModelCtrl.$setViewValue(newValue);
      });

      getAppTypes();
    };

    function getAppTypes() {
      dataService.AppTypes.get({}, function (response) {
        if (response.ret === 0) {
          vm.appTypes = response.result;
          vm.appType = initAppTypeByAppid(vm.initialAppid, vm.appTypes);
        }
      });
    }

    function initAppTypeByAppid(initialAppid, appTypes) {
      for (var i = 0; i < appTypes.length; i++) {
        if (appTypes[i].appId === initialAppid) {
          return appTypes[i];
        }
      }

      return null;
    }

  }

}());
