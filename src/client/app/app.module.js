(function () {
  'use strict';

  angular
    .module('app', [

      /*
       *  3rd party angular modules
       */
      'ngResource',
      'ngAnimate',
      'ngCookies',
      'ngSanitize',
      'ngLocale',
      'ui.router',
      'toastr',
      'swxSessionStorage',
      'ui.bootstrap',
      'angular-loading-bar',

      /*
       * Our reusable cross app code modules
       */
      'ccWidget',
      'blocks.logger',

      /*
       *  app common area
       */
      'app.core',
      'app.utils',
      'app.widgets',

      /*
       * feature area
       */
      'app.login',
      'app.home',
      'app.dashboard',
      'app.shops',
      'app.wallet',
      'app.orders',
      'app.goods',
      'app.settings',
      'app.user',
      'app.passwordForget',
      'app.appVersion',
      'app.agents',
      'app.funds',
    ]);

}());
