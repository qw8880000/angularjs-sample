(function () {
'use strict';

  angular
    .module('app.home')
    .component('home', {
      templateUrl: 'app/home/home.html',
      controller: homeController,
      controllerAs: 'vm',
    });

  /* @ngInject */
  function homeController() {
    var vm = this;
    vm.title = 'homeController';

    activate();

    ////////////////

    function activate() {
    }
  }

}());
