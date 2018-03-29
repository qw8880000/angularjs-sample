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
        templateUrl: 'app/features/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm',
        data: {
          public: true,
        },
      })
      .state({
        name: 'home',
        url: '/home',
        // abstract: true,
        templateUrl: 'app/features/home/home.html',
        controller: 'HomeController',
        controllerAs: 'vm',
        // resolve: {
          // navItems: function (dataService) {
            // return dataService.navItems.query();
          // }
        // },
      })
      .state({
        name: 'home.dashboard',
        url: '/dashboard',
        templateUrl: 'app/features/dashboard/dashboard.html',
      })
    //
    // components
    //
      .state({
        name: 'home.components',
        utl: '/components',
        abstract: true,
        template: '<ui-view></ui-view>',
      })
      .state({
        name: 'home.components.breadcrumbs',
        url: '/breadcrumbs',
        templateUrl: 'app/features/breadcrumbs/breadcrumbs.html',
        controller: 'BreadcrumbsController',
        controllerAs: 'vm',
      })
      .state({
        name: 'home.components.buttons',
        url: '/buttons',
        templateUrl: 'app/features/buttons/buttons.html',
        controller: 'ButtonsController',
        controllerAs: 'vm',
      })
      .state({
        name: 'home.components.cards',
        url: '/cards',
        templateUrl: 'app/features/cards/cards.html',
        controller: 'CardsController',
        controllerAs: 'vm',
      })
      .state({
        name: 'home.components.forms',
        url: '/forms',
        templateUrl: 'app/features/forms/forms.html',
        controller: 'FormsController',
        controllerAs: 'vm',
      })
      .state({
        name: 'home.components.tables',
        url: '/tables',
        templateUrl: 'app/features/tables/tables.html',
      })
      .state({
        name: 'home.components.paginations',
        url: '/paginations',
        templateUrl: 'app/features/paginations/paginations.html',
        controller: 'PaginationsController',
        controllerAs: 'vm',
      })
    //
    // angular
    //
      .state({
        name: 'home.angular',
        utl: '/angular',
        abstract: true,
        template: '<ui-view></ui-view>',
      })
      .state({
        name: 'home.angular.customFilters',
        url: '/custom-filters',
        templateUrl: 'app/features/custom-filters/custom-filters.html',
        controller: 'CustomFiltersController',
        controllerAs: 'vm',
      })
      .state({
        name: 'home.angular.repeaters',
        url: '/repeaters',
        templateUrl: 'app/features/repeaters/repeaters.html',
        controller: 'RepeatersController',
        controllerAs: 'vm',
      })
      .state({
        name: 'home.angular.toastrs',
        url: '/toastrs',
        templateUrl: 'app/features/toastrs/toastrs.html',
        controller: 'ToastrsController',
        controllerAs: 'vm',
      })
      .state({
        name: 'home.angular.modals',
        url: '/modals',
        templateUrl: 'app/features/modals/modals.html',
        controller: 'ModalsController',
        controllerAs: 'vm',
      })
      .state({
        name: 'home.angular.animations',
        url: '/animations',
        templateUrl: 'app/features/animations/animations.html',
        controller: 'AnimationsController',
        controllerAs: 'vm',
      })
      .state({
        name: 'home.angular.croppers',
        url: '/croppers',
        templateUrl: 'app/features/croppers/croppers.html',
        controller: 'CroppersController',
        controllerAs: 'vm',
      });
  }

}());
