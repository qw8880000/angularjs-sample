(function () {
'use strict';

  angular
    .module('app.croppers')
    .controller('CroppersController', CroppersController);

  /* @ngInject */
  function CroppersController($log) {
    var vm = this;
    vm.title = 'CroppersController';

    activate();

    ////////////////

    function activate() {
      var $image = angular.element('#image');
      $image.cropper({
        aspectRatio: 16/9,
        preview: 'div#preview',
        ready: function () {
          $log.info('ready');
        },
        cropstart: function () {
          $log.info('cropstart');
        },
        cropmove: function () {
          $log.info('cropmove');
        },
        cropend: function () {
          $log.info('cropend');
        },
        crop: function () {
          $log.info('crop');
        },
        zoom: function () {
          $log.info('zoom');
        },
      });
    }
  }
}());
