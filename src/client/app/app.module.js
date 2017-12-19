(function () {
  'use strict';

  angular
    .module('app', [

      /*
       *  common area
       */
      'app.core',

      /*
       * feature area
       */
      'app.home',
      'app.repeaters',
    ]);

}());
