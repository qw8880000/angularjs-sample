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
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm',
        data: {
          public: true,
        },
      })
      .state({
        name: 'home',
        url: '/home',
        templateUrl: 'app/home/home.html',
        controller: 'HomeController',
        controllerAs: 'vm',
        resolve: {
          navItems: function (dataService) {
            return dataService.navItems.query();
          }
        },
      })
      .state({
        name: 'home.animations',
        url: '/animations',
        templateUrl: 'app/animations/animations.html',
        controller: 'AnimationsController',
        controllerAs: 'vm',
      })
      .state({
        name: 'home.breadcrumbs',
        url: '/breadcrumbs',
        templateUrl: 'app/breadcrumbs/breadcrumbs.html',
        controller: 'BreadcrumbsController',
        controllerAs: 'vm',
      })
      .state({
        name: 'home.buttons',
        url: '/buttons',
        templateUrl: 'app/buttons/buttons.html',
        controller: 'ButtonsController',
        controllerAs: 'vm',
      })
      .state({
        name: 'home.cards',
        url: '/cards',
        templateUrl: 'app/cards/cards.html',
        controller: 'CardsController',
        controllerAs: 'vm',
      })
      .state({
        name: 'home.customFilters',
        url: '/custom-filters',
        templateUrl: 'app/custom-filters/custom-filters.html',
        controller: 'CustomFiltersController',
        controllerAs: 'vm',
      })
      .state({
        name: 'home.dashboard',
        url: '/dashboard',
        templateUrl: 'app/dashboard/dashboard.html',
      })
      .state({
        name: 'home.forms',
        url: '/forms',
        templateUrl: 'app/forms/forms.html',
        controller: 'FormsController',
        controllerAs: 'vm',
      })
      .state({
        name: 'home.repeaters',
        url: '/repeaters',
        templateUrl: 'app/repeaters/repeaters.html',
        controller: 'RepeatersController',
        controllerAs: 'vm',
      })
      .state({
        name: 'home.toastrs',
        url: '/toastrs',
        templateUrl: 'app/toastrs/toastrs.html',
        controller: 'ToastrsController',
        controllerAs: 'vm',
      });
  }

}());
