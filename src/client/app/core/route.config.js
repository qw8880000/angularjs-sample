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
        name: 'animations',
        url: '/animations',
        component: 'animations',
      })
      .state({
        name: 'breadcrumbs',
        url: '/breadcrumbs',
        component: 'breadcrumbs',
      })
      .state({
        name: 'buttons',
        url: '/buttons',
        component: 'buttons',
      })
      .state({
        name: 'cards',
        url: '/cards',
        component: 'cards',
      })
      .state({
        name: 'customFilters',
        url: '/custom-filters',
        component: 'customFilters',
      })
      .state({
        name: 'dashboard',
        url: '/dashboard',
        component: 'dashboard',
      })
      .state({
        name: 'forms',
        url: '/forms',
        component: 'forms',
      })
      .state({
        name: 'repeaters',
        url: '/repeaters',
        component: 'repeaters',
      })
      .state({
        name: 'toastrs',
        url: '/toastrs',
        component: 'toastrs',
      });
  }

}());
