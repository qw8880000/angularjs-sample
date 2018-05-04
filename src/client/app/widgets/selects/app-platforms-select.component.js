(function () {
  'use strict';

  angular
    .module('app.widgets')
    .component('appPlatformsSelect', {
      templateUrl: 'app/widgets/selects/app-platforms-select.html',
      controller: appPlatromsSelectController,
      controllerAs: 'vm',
      require: {
        ngModelCtrl: '?ngModel',
      }, // get a hold of NgModelController
      bindings: {
        required: '<',
        disabled: '<',
        initialId: '<',
        name: '@'
      },
    });

  /* @ngInject */
  function appPlatromsSelectController(dataService,
                                       $scope,
                                       $log) {
    var vm = this;
    vm.appPlatforms = [];
    vm.appPlatform = null;
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
        vm.appPlatform = ngModelCtrl.$viewValue;
      };

      // modelValue to viewValue
      $scope.$watch('vm.appPlatform', function (newValue, oldValue) {
        ngModelCtrl.$setViewValue(newValue);
      });

      getAppPlatforms();
    }

    function getAppPlatforms() {
      dataService.AppPlatforms.get({}, function (response) {
        if (response.ret === 0) {
          vm.appPlatforms = response.result;
          vm.appPlatform = initAppPlatformById(vm.initialId, vm.appPlatforms);
        }
      });
    }

    function initAppPlatformById(initialId, appPlatforms) {
      for (var i = 0; i < appPlatforms.length; i++) {
        if (appPlatforms[i].id === initialId) {
          return appPlatforms[i];
        }
      }
      return null;
    }
  }

}());
