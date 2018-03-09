(function () {
  'use strict';

  angular
    .module('app.core')
    .config(routeConfig);

  /* @ngInject */
  function routeConfig($stateProvider, $urlServiceProvider) {

    $urlServiceProvider.rules.otherwise('/dashboard');

    $stateProvider
      .state({
        name: 'dashboard',
        url: '/dashboard',
        component: 'dashboard',
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
      })
      .state({
        name: 'toastrs',
        url: '/toastrs',
        component: 'toastrs',
      })
      .state({
        name: 'fileUpload',
        url: '/fileUpload',
        component: 'fileUpload',
      });
  }

}());
