(function () {
'use strict';

  angular
    .module('app.forms')
    .component('forms', {
      templateUrl: 'app/forms/forms.html',
      controller: formsController,
      controllerAs: 'vm',
    });

  /* @ngInject */
  function formsController() {
    var vm = this;
    vm.title = 'formsController';
  }

}());
