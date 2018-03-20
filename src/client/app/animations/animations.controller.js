(function () {
  'use strict';

  angular
    .module('app.animations')
    .controller('AnimationsController', AnimationsController);

  /* @ngInject */
  function AnimationsController() {
    var vm = this;
    vm.title = 'animations demo';
  }

}());
