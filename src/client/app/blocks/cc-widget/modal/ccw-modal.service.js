(function () {
'use strict';

  angular
    .module('ccwModal')
    .factory('ccwModal', ccwModal);

  /* @ngInject */
  function ccwModal(modalStack,
    $q,
    $rootScope,
    $controller,
    $templateCache,
    $injector,
    $http) {

    var service = {
      open: open
    };
    return service;

    ////////////////

    // Loads the template from cache or requests and adds it to the cache
    function getTemplatePromise(options) {
      return options.template ? $q.when(options.template) :
        $http.get(angular.isFunction(options.templateUrl) ? (options.templateUrl)() : options.templateUrl,
          {cache: $templateCache}).then(function (result) {
            return result.data;
          });
    }

    // Get resolves
    function getResolvePromises(resolves) {
      var promisesArr = [];
      angular.forEach(resolves, function (value) {
        if (angular.isFunction(value) || angular.isArray(value)) {
          promisesArr.push($q.when($injector.invoke(value)));
        }
      });
      return promisesArr;
    }

    function open(modalOptions) {
      var defaultOptions = {
        // template
        // templateUrl
        // scope
        // controller
        // controllerAs
        // resolve
        // bodyClass
      };

      var modalResultDeferred = $q.defer();
      var modalOpenedDeferred = $q.defer();

      //prepare an instance of a modal to be injected into controllers and returned to a caller
      var modalInstance = {
        result: modalResultDeferred.promise,
        opened: modalOpenedDeferred.promise,
        close: function (result) {
          modalStack.close(modalInstance, result);
        },
        dismiss: function (reason) {
          modalStack.dismiss(modalInstance, reason);
        }
      };

      //merge and clean up options
      modalOptions = angular.extend(defaultOptions, modalOptions);
      modalOptions.resolve = modalOptions.resolve || {};

      //verify options
      if (!modalOptions.template && !modalOptions.templateUrl) {
        throw new Error('One of template or templateUrl options is required.');
      }

      var templateAndResolvePromise =
        $q.all([getTemplatePromise(modalOptions)].concat(getResolvePromises(modalOptions.resolve)));

      templateAndResolvePromise.then(function resolveSuccess(tplAndVars) {

        var modalScope = (modalOptions.scope || $rootScope).$new();
        var ctrlInstance, ctrlInjectors = {};
        var resolveIter = 1;

        //
        // controller and controllerAs
        if (modalOptions.controller) {
          ctrlInjectors.$scope = modalScope;
          ctrlInjectors.$ccwModalInstance = modalInstance;
          angular.forEach(modalOptions.resolve, function (value, key) {
            ctrlInjectors[key] = tplAndVars[resolveIter++];
          });

          ctrlInstance = $controller(modalOptions.controller, ctrlInjectors);
          if (modalOptions.controllerAs) {
            modalScope[modalOptions.controllerAs] = ctrlInstance;
          }
        }

        modalStack.open(modalInstance, {
          scope: modalScope,
          deferred: modalResultDeferred,
          template: tplAndVars[0],
          bodyClass: modalOptions.bodyClass || '',
        });

      }, function resolveError(reason) {
        modalResultDeferred.reject(reason);
      });

      templateAndResolvePromise.then(function () {
        modalOpenedDeferred.resolve(true);
      }, function () {
        modalOpenedDeferred.reject(false);
      });

      return modalInstance; 
    }
  }
}());
