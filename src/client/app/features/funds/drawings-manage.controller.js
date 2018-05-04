(function () {
  'use strict';

  angular
    .module('app.funds')
    .controller('DrawingsManageController', DrawingsManageController);

  /* @ngInject */
  function DrawingsManageController(dataService,
                                    dictionary,
                                    dialogService,
                                    DICTIONARY,
                                    DRAWINGSTATE,
                                    datetime,
                                    PAGINATION) {
    var vm = this;
    vm.drawings = {};
    vm.drawingStates = [];
    vm.search = {
      drawingState: null,
      serialNumber: null,
      beginCreateTime: null,
      endCreateTime: null,
    };
    vm.searchAction = searchAction;
    vm.refresh = refresh;
    vm.currentPage = 1;
    vm.totalItems = 0;
    vm.itemsPerPage = PAGINATION.ITEMSPERPAGE;

    vm.confirm = confirm;
    vm.isFinished = isFinished;

    activate();

    ////////////////

    function activate() {
      getDrawingStates().then(function () {
        vm.search.drawingState = vm.drawingStates[0];
        getData(getParams());
      });
    }

    function refresh() {
      getData(getParams());
    }

    function searchAction() {
      vm.currentPage = 1;     // 只要一点击搜索，统一回到第1页
      getData(getParams());
    }

    function getParams() {
      var params = {};

      if (vm.search.drawingState !== null) {
        params.state = vm.search.drawingState.id;
      }
      if (angular.isString(vm.search.serialNumber) && vm.search.serialNumber !== '') {
        params.serialNumber = vm.search.serialNumber;
      }
      if (angular.isDate(vm.search.beginCreateTime)) {
        params.beginCreateTime = datetime.getSecondTime(vm.search.beginCreateTime);
      }
      if (angular.isDate(vm.search.endCreateTime)) {
        params.endCreateTime = datetime.getSecondTime(vm.search.endCreateTime);
      }

      params.page = vm.currentPage - 1;
      params.size = vm.itemsPerPage;

      return params;
    }

    function getData(params) {
      dataService.Drawings.get(params, function (response) {
        if (response.ret === 0) {
          vm.drawings = response.result.data;
          vm.totalItems = response.result.page.totalElements;
        }
      });
    }

    function getDrawingStates() {
      return dictionary.get(DICTIONARY.WITHDRAWALSTATE).then(function (drawingStates) {
        vm.drawingStates = drawingStates;
        vm.drawingStates.sort(function (a, b) {return a.id - b.id;});
      });
    }

    function confirm(drawing) {
      var message = '确认 ' + drawing.recipient + ' 的提现？';

      dialogService.confirm(message, function () {
        dataService.Drawing.finish({
          id: drawing.id,
        }, function (response) {
          if (response.ret === 0) {
            refresh();
          }
        });
      });
    }

    function isFinished() {
      return (vm.search.drawingState.id == DRAWINGSTATE.DRAWINGFINISHED);
    }

  }
}());
