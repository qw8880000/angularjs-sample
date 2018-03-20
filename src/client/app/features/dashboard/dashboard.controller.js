(function () {
'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  /* @ngInject */
  function DashboardController() {
    var vm = this;
    vm.title = 'DashboardController';

    activate();

    ////////////////

    function activate() {
    }
  }
}());
