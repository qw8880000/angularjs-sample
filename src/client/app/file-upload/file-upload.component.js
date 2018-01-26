(function () {
  'use strict';

  angular
    .module('app.fileUpload')
    .component('fileUpload', {
      templateUrl: 'app/file-upload/file-upload.html',
      controller: fileUploadController,
      controllerAs: 'vm',
    });

  /* @ngInject */
  function fileUploadController() {
    var vm = this;
    vm.title = 'fileUploadController';
    vm.image = null;

    activate();

    ////////////////

    function activate() {
    }
  }

}());
