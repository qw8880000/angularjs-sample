(function () {
  'use strict';

  angular
    .module('app.core')
    .factory('dataService', dataService);

  /* @ngInject */
  function dataService($resource) {
    var service = {
      Phone: Phone,
    };
    return service;

    ////////////////

    function Phone() {
    }
  }
}());
