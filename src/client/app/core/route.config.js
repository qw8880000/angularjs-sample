(function () {
  'use strict';

  angular
    .module('app.core')
    .config(routeConfig);

  /* @ngInject */
  function routeConfig($stateProvider,
                       ADSTYPE,
                       $urlServiceProvider) {

    // $locationProvider.html5Mode(true);

    // 默认路由设置
    $urlServiceProvider.rules.otherwise('login');

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
        params: {
          isTokenExpired: false,
        },
      })
      .state({
        name: 'home',
        url: '/home',
        templateUrl: 'app/features/home/home.html',
        controller: 'HomeController',
        controllerAs: 'vm',
      })
      .state({
        name: 'home.user-eidt',
        url: '/user-edit',
        templateUrl: 'app/features/user/user-edit.html',
        controller: 'UserEditController',
        controllerAs: 'vm',
      })
      .state({
        name: 'home.password-edit',
        url: '/password-edit',
        templateUrl: 'app/features/user/password-edit.html',
        controller: 'PasswordEditController',
        controllerAs: 'vm',
      })
      .state({
        name: 'password-forget',
        url: '/password-forget',
        templateUrl: 'app/features/password-forget/password-forget.html',
        controller: 'PasswordForgetController',
        controllerAs: 'vm',
        data: {
          public: true,
        },
      })
      .state({
        name: 'home.dashboard',
        url: '/dashboard',
        templateUrl: 'app/features/dashboard/dashboard.html',
        controller: 'DashboardController',
        controllerAs: 'vm',
      })
      .state({
        name: 'home.shops',
        url: '/shops',
        abstract: true,
        template: '<ui-view></ui-view>',
      })
      .state({
        name: 'home.shops.manage',
        url: '/manage',
        templateUrl: 'app/features/shops/shops-manage.html',
        controller: 'ShopsManageController',
        controllerAs: 'vm',
      })
      .state({
        name: 'home.shops.edit',
        url: '/edit/:id',
        templateUrl: 'app/features/shops/shops-edit.html',
        controller: 'ShopsEditController',
        controllerAs: 'vm',
        params: {
          id: '',
          shop: null,
        },
      })
      .state({
        name: 'home.wallet',
        url: '/wallet',
        abstract: true,
        template: '<ui-view></ui-view>',
      })
      .state({
        name: 'home.wallet.manage',
        url: '/manage',
        templateUrl: 'app/features/wallet/wallet-manage.html',
        controller: 'WalletManageController',
        controllerAs: 'vm',
      })
      .state({
        name: 'home.wallet.view',
        url: '/view/:id',
        templateUrl: 'app/features/wallet/wallet-view.html',
        controller: 'WalletViewController',
        controllerAs: 'vm',
        params: {
          id: '',
        },
      })
      .state({
        name: 'home.orders',
        url: '/orders',
        abstract: true,
        template: '<ui-view></ui-view>',
      })
      .state({
        name: 'home.orders.manage',
        url: '/manage',
        templateUrl: 'app/features/orders/orders-manage.html',
        controller: 'OrdersManageController',
        controllerAs: 'vm',
      })
      .state({
        name: 'home.orders.view',
        url: '/view/:id',
        templateUrl: 'app/features/orders/orders-view.html',
        controller: 'OrdersViewController',
        controllerAs: 'vm',
        params: {
          id: '',
          order: null,
        },
      })
      .state({
        name: 'home.goods',
        url: '/goods',
        abstract: true,
        template: '<ui-view></ui-view>',
      })
      .state({
        name: 'home.goods.manage',
        url: '/manage',
        templateUrl: 'app/features/goods/goods-manage.html',
        controller: 'GoodsManageController',
        controllerAs: 'vm',
      })
      .state({
        name: 'home.goods.view',
        url: '/view/:id',
        templateUrl: 'app/features/goods/goods-view.html',
        controller: 'GoodsViewController',
        controllerAs: 'vm',
        params: {
          id: '',
          good: null,
        },
      })
      .state({
        name: 'home.goods.recommend',
        url: '/recommend',
        templateUrl: 'app/features/goods/goods-recommend.html',
        controller: 'GoodsRecommendController',
        controllerAs: 'vm',
      })
      .state({
        name: 'home.goods.visibility',
        url: '/visibility',
        templateUrl: 'app/features/goods/goods-visibility.html',
        controller: 'GoodsVisibilityController',
        controllerAs: 'vm',
      })
      .state({
        name: 'home.settings',
        url: '/settings',
        abstract: true,
        template: '<ui-view></ui-view>',
      })
      .state({
        name: 'home.settings.goods-category-manage',
        url: '/goods-category-manage',
        templateUrl: 'app/features/settings/goods-category-manage.html',
        controller: 'GoodsCategoryManageController',
        controllerAs: 'vm',
      })
      .state({
        name: 'home.settings.ads-life-manage',
        url: '/ads-life-manage',
        templateUrl: 'app/features/settings/ads-manage.html',
        controller: 'AdsManageController',
        controllerAs: 'vm',
        params: {
          adsType: ADSTYPE.LIFE,
        },
      })
      .state({
        name: 'home.settings.ads-goods-manage',
        url: '/ads-goods-manage',
        templateUrl: 'app/features/settings/ads-manage.html',
        controller: 'AdsManageController',
        controllerAs: 'vm',
        params: {
          adsType: ADSTYPE.GOODS,
        },
      })
      .state({
        name: 'home.settings.ads-startup-manage',
        url: '/ads-startup-manage',
        templateUrl: 'app/features/settings/ads-manage.html',
        controller: 'AdsManageController',
        controllerAs: 'vm',
        params: {
          adsType: ADSTYPE.STARTUP,
        },
      })
      .state({
        name: 'home.settings.app-version-manage',
        url: '/app-version-manage',
        templateUrl: 'app/features/app-version/app-version-manage.html',
        controller: 'AppVersionManageController',
        controllerAs: 'vm',
      })
      .state({
        name: 'home.settings.app-version-edit',
        url: '/app-version-edit/:id',
        templateUrl: 'app/features/app-version/app-version-edit.html',
        controller: 'AppVersionEditController',
        controllerAs: 'vm',
        params: {
          id: null,
          appVersion: null,
        },
      })
      .state({
        name: 'home.settings.app-version-view',
        url: '/app-version-view/:id',
        templateUrl: 'app/features/app-version/app-version-view.html',
        controller: 'AppVersionViewController',
        controllerAs: 'vm',
        params: {
          id: null,
        },
      })
      .state({
        name: 'home.agents',
        url: '/agents',
        abstract: true,
        template: '<ui-view></ui-view>',
      })
      .state({
        name: 'home.agents.manage',
        url: '/manage',
        templateUrl: 'app/features/agents/agents-manage.html',
        controller: 'AgentsManageController',
        controllerAs: 'vm',
      })
      .state({
        name: 'home.agents.edit',
        url: '/edit/:id',
        templateUrl: 'app/features/agents/agents-edit.html',
        controller: 'AgentsEditController',
        controllerAs: 'vm',
        params: {
          id: null,
        },
      })
      .state({
        name: 'home.funds',
        url: '/funds',
        abstract: true,
        template: '<ui-view></ui-view>',
      })
      .state({
        name: 'home.funds.refunds-manage',
        url: '/refunds-manage',
        templateUrl: 'app/features/funds/refunds-manage.html',
        controller: 'RefundsManageController',
        controllerAs: 'vm',
      })
      .state({
        name: 'home.funds.drawings-manage',
        url: '/drawings-manage',
        templateUrl: 'app/features/funds/drawings-manage.html',
        controller: 'DrawingsManageController',
        controllerAs: 'vm',
      })
      .state({
        name: 'home.funds.funds-manage',
        url: '/funds-manage',
        templateUrl: 'app/features/funds/funds-manage.html',
        controller: 'FundsManageController',
        controllerAs: 'vm',
      })
      .state({
        name: 'home.authority',
        url: '/authority',
        abstract: true,
        template: '<ui-view></ui-view>',
      })
      .state({
        name: 'home.authority.xxx',
        url: '/xxx',
        template: '<h3 class="mt-3 ml-3">页面建设中...</h3>',
      })
      .state({
        name: 'home.dataAnalysis',
        url: '/authority',
        abstract: true,
        template: '<ui-view></ui-view>',
      })
      .state({
        name: 'home.dataAnalysis.xxx',
        url: '/xxx',
        template: '<h3 class="mt-3 ml-3">页面建设中...</h3>',
      })
      .state({
        name: 'home.data',
        url: '/data',
        abstract: true,
        template: '<ui-view></ui-view>',
      })
      .state({
        name: 'home.data.xxx',
        url: '/xxx',
        template: '<h3 class="mt-3 ml-3">页面建设中...</h3>',
      })
  }

}());
