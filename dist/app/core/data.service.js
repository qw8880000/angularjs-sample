(function () {
  'use strict';

  angular
    .module('app.core')
    .factory('dataService', dataService);

  /* @ngInject */
  function dataService($resource) {
    var service = {
      Phone: $resource('resources/phones/:phoneId.json', { phoneId: 'phones' }),
    };
    return service;

    ////////////////
  }
}());
