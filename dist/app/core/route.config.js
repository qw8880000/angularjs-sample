(function () {
  'use strict';

  routeConfig.$inject = ['$stateProvider', '$urlServiceProvider'];
  angular
    .module('app.core')
    .config(routeConfig);

  /* @ngInject */
  function routeConfig($stateProvider, $urlServiceProvider) {

    $urlServiceProvider.rules.otherwise('/home');

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
      })
      .state({
        name: 'customFilters',
        url: '/custom-filters',
        component: 'customFilters',
      })
      .state({
        name: 'animations',
        url: '/animations',
        component: 'animations',
      });
  }

}());
