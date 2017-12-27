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
      // 'blocks.exception', 'blocks.logger', 'blocks.router',

      /*
       * 3rd party modules
       */
      'ui.router',

      /*
       *  app common area
       */
      'app.core',
      // 'app.widgets',

      /*
       * feature area
       */
      'app.home',
      'app.repeaters',
      'app.customFilters',
      'app.animations',
    ]);

}());
