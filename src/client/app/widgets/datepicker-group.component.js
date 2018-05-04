(function () {
'use strict';

  angular
    .module('app.widgets')
    .component('datepickerGroup', {
      bindings: {
        dateStart: '=dtpDateStart',
        dateEnd: '=dtpDateEnd',
        title: '@dtpTitle',
        showInterval: '<dtpShowInterval',
      },
      templateUrl: 'app/widgets/datepicker-group.html',
      controller: datepickerGroupController,
      controllerAs: 'vm',
    });

  /* @ngInject */
  function datepickerGroupController() {
    var vm = this;
    vm.popup = {
      dateStart: false,
      dateEnd: false,
    };
    vm.dateIntervals = [
      {'id': 1, 'name': '最近1天', 'type': 'day'},
      {'id': 3, 'name': '最近3天', 'type': 'day'},
      {'id': 7, 'name': '最近7天', 'type': 'day'},
      {'id': 30, 'name': '最近30天', 'type': 'day'},
      {'id': 30, 'name': '最近1个月', 'type': 'month'},
      {'id': 91, 'name': '最近3个月', 'type': 'month'},
      {'id': 180, 'name': '最近半年', 'type': 'month'}
    ];
    vm.dateInterval = null;

    vm.openPopupDateStart = openPopupDateStart;
    vm.openPopupDateEnd = openPopupDateEnd;
    vm.change = change;

    activate();

    ////////////////

    function activate() {
    }

    function openPopupDateStart() {
      vm.popup.dateStart = !vm.popup.dateStart;
    }

    function openPopupDateEnd() {
      vm.popup.dateEnd = !vm.popup.dateEnd;
    }

    function change() {
      if (vm.dateInterval === null) {
        vm.dateStart = null;
        vm.dateEnd = null;
      } else {
        var dateInterval = vm.dateInterval.id;
        vm.dateEnd = new Date();    // today
        vm.dateStart = new Date();    // today
        vm.dateStart.setDate(vm.dateEnd.getDate() - dateInterval);
      }
    }
  }

}());
