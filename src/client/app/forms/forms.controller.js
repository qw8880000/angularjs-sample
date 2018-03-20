(function () {
'use strict';

  angular
    .module('app.forms')
    .controller('FormsController', FormsController);

  /* @ngInject */
  function FormsController() {
    var vm = this;
    vm.title = 'formsController';
  }

}());
