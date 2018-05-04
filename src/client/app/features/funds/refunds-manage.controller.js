(function () {
  'use strict';

  angular
    .module('app.funds')
    .controller('RefundsManageController', RefundsManageController);

  /* @ngInject */
  function RefundsManageController(dataService,
                                   dictionary,
                                   dialogService,
                                   DICTIONARY,
                                   REFUNDSTATE,
                                   PAGINATION) {
    var vm = this;
    vm.refunds = {};
    vm.refundStates = [];
    vm.payMethods = [];
    vm.search = {
      refundState: null,
    };
    vm.searchAction = searchAction;
    vm.refresh = refresh;
    vm.currentPage = 1;
    vm.totalItems = 0;
    vm.itemsPerPage = PAGINATION.ITEMSPERPAGE;
    
    vm.confirm = confirm;
    vm.isRefunding = isRefunding;

    activate();

    ////////////////

    function activate() {
      getRefundStates().then(function () {
        vm.search.refundState = vm.refundStates[0];
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

      if (vm.search.refundState !== null) {
        params.stateId = vm.search.refundState.id;
      }

      params.page = vm.currentPage - 1;
      params.size = vm.itemsPerPage;

      return params;
    }

    function getData(params) {
      dataService.Refunds.get(params, function (response) {
        if (response.ret === 0) {
          vm.refunds = response.result.data;
          vm.totalItems = response.result.page.totalElements;
        }
      });
    }

    function getRefundStates() {
      return dictionary.get(DICTIONARY.REFUNDSTATE).then(function (refundStates) {
        angular.forEach(refundStates, function (refundState) {
          if (refundState.id == REFUNDSTATE.REFUNDING || refundState.id == REFUNDSTATE.REFUNDSUCCESS) {
            vm.refundStates.push(refundState);
          }
        });
        vm.refundStates.sort(function (a, b) {return a.id - b.id;});
      });
    }
    
    function confirm(refund) {
      var message = '确认退款？';
      var refundIds = [];

      refundIds.push(refund.id);

      dialogService.confirm(message, function () {
        dataService.Refunds.batchSet({
          refundIds: refundIds,
          paymentPlatform: 1,   // ???
          description: "运营商统一退款"
        }, function (response) {
          if (response.ret === 0) {
            refresh();
          }
        });
      });
    }

    function isRefunding() {
      return (vm.search.refundState.id == REFUNDSTATE.REFUNDING);
    }

  }
}());
