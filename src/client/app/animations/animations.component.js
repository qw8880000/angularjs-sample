(function () {
  'use strict';

  angular
    .module('app.animations')
    .component('animations', {
      templateUrl: 'app/animations/animations.html',
      controller: animationsController,
      controllerAs: 'vm',
    });

  /* @ngInject */
  function animationsController() {
    var vm = this;
    vm.title = 'animations demo';
  }

}());
