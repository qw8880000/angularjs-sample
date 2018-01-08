(function () {

  'use strict';

  angular
    .module('app.core')
    .config(toastrConfiger);

  /* @ngInject */
  function toastrConfiger(toastrConfig) {
    angular.extend(toastrConfig, {
      positionClass: 'toast-bottom-right',
    });
  }
}());
