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
        template: '<div>test</div>',
      })
      .state({
        name: 'template',
        url: '/template',
        template: '<div>test</div>',
      });
  }

}());
