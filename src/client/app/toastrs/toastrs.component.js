(function () {
  'use strict';

  angular
    .module('app.toastrs')
    .component('toastrs', {
      templateUrl: 'app/toastrs/toastrs.html',
      controller: toastrsController,
      controllerAs: 'vm',
    });

  /* @ngInject */
  function toastrsController(toastr) {
    var vm = this;
    vm.title = 'toastrsController';
    vm.openToastr = openToastr;

    activate();

    ////////////////

    function activate() {
    }

    function openToastr() {
      var a = arguments;
      if (a.length === 2) {
        var type = a[0];
        var content = a[1];

        if(type === 'success') {
          toastr.success(content);
        }
        else if (type === 'info') {
          toastr.info(content);
        }
        else if (type === 'warning') {
          toastr.warning(content);
        }
        else {
          toastr.error(content);
        }

      } 
      else if (a.length === 3) {
        var type = a[0];
        var content = a[1];
        var title = a[2];

        if(type === 'success') {
          toastr.success(content, title);
        }
        else if (type === 'info') {
          toastr.info(content, title);
        }
        else if (type === 'warning') {
          toastr.warning(content, title);
        }
        else {
          toastr.error(content, title);
        }

      }
    }

  }

}());
