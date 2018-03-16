(function () {
  'use strict';

  angular
    .module('app.core')
    .config(routeConfig);

  /* @ngInject */
  function routeConfig($stateProvider, $urlServiceProvider) {

    // 默认路由设置
    $urlServiceProvider.rules.otherwise('home');

    // 路由设置
    $stateProvider
      .state({
        name: 'login',
        url: '/login',
        component: 'login',
        data: {
          public: true,
        },
      })
      .state({
        name: 'home',
        url: '/home',
        component: 'home',
      })
      .state({
        name: 'home.animations',
        url: '/animations',
        component: 'animations',
        data: {public: true},
      })
      .state({
        name: 'home.breadcrumbs',
        url: '/breadcrumbs',
        component: 'breadcrumbs',
      })
      .state({
        name: 'home.buttons',
        url: '/buttons',
        component: 'buttons',
      })
      .state({
        name: 'home.cards',
        url: '/cards',
        component: 'cards',
      })
      .state({
        name: 'home.customFilters',
        url: '/custom-filters',
        component: 'customFilters',
      })
      .state({
        name: 'home.dashboard',
        url: '/dashboard',
        component: 'dashboard',
      })
      .state({
        name: 'home.forms',
        url: '/forms',
        component: 'forms',
      })
      .state({
        name: 'home.repeaters',
        url: '/repeaters',
        component: 'repeaters',
      })
      .state({
        name: 'home.toastrs',
        url: '/toastrs',
        component: 'toastrs',
      });
  }

}());
