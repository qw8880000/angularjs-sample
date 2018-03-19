(function () {
  'use strict';

  angular
    .module('app', [

      /*
       *  3rd party angular modules
       */
      'ngResource', 'ngAnimate', 'ngCookies', 'ui.router', 'toastr',

      /*
       * Our reusable cross app code modules
       */
      'ccWidget',

      /*
       *  app common area
       */
      'app.core',

      /*
       * feature area
       */
      'app.login',
      'app.layout',
      'app.home',
      'app.animations',
      'app.breadcrumbs',
      'app.buttons',
      'app.cards',
      'app.customFilters',
      'app.dashboard',
      'app.forms',
      'app.repeaters',
      'app.toastrs',
    ]);

}());
