(function () {

  'use strict';

  angular
    .module('app.core')
    .config(toastrConfig);

  function toastrConfig(toastrConfig) {
    angular.extend(toastrConfig, {
      positionClass: 'toast-bottom-right',
    });
  }
}());
