(function () {
  'use strict';

  angular
    .module('app', [

      /*
       * Angular modules
       */
      'ngResource', 'ngAnimate', // 'ngSanitize',

      /*
       * Our reusable cross app code modules
       */
      'ccWidget',

      /*
       * 3rd party modules
       */
      'ui.router', 'toastr',

      /*
       *  app common area
       */
      'app.core',

      /*
       * feature area
       */
      'app.animations',
      'app.buttons',
      'app.customFilters',
      'app.dashboard',
      'app.layout',
      'app.repeaters',
      'app.toastrs',
    ]);

}());
