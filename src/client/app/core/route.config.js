(function () {
  'use strict';

  angular
    .module('app.core')
    .config(routeConfig);

  /* @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state({
        name: 'home',
        url: '/home',
        component: 'home',
      })
      .state({
        name: 'repeaters',
        url: '/repeaters',
        component: 'repeaters',
      });
  }

}());
