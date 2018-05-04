(function () {
  'use strict';

  angular
    .module('app.wallet')
    .controller('WalletManageController', WalletManageController);

  /* @ngInject */
  function WalletManageController(dataService,
                                  datetime,
                                  PAGINATION) {

    var vm = this;
    vm.funds = [];
    vm.wallet = {};
    vm.fundInfos = {};

    vm.search = {
      serialNumber: '',
      dateStart: '',
      dateEnd: '',
    };
    vm.searchAction = searchAction;
    vm.refresh = refresh;
    vm.currentPage = 1;
    vm.totalItems = 0;
    vm.itemsPerPage = PAGINATION.ITEMSPERPAGE;

    activate();

    ////////////////

    function activate() {
      getData(getParams());
      getWallet();
      getFoudsInfo(getParams());
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

      if (angular.isDate(vm.search.dateStart)) {
        params.beginTime = datetime.getSecondTime(vm.search.dateStart);
      }

      if (angular.isDate(vm.search.dateEnd)) {
        params.endTime = datetime.getSecondTime(vm.search.dateEnd);
      }

      if (angular.isString(vm.search.serialNumber) && vm.search.serialNumber !== '') {
        params.serialNumber = vm.search.serialNumber;
      }

      params.page = vm.currentPage - 1;
      params.size = vm.itemsPerPage;

      return params;
    }

    function getData(params) {
      dataService.Funds.get(params, function (response) {
        if (response.ret === 0) {
          vm.funds = response.result.data;
          vm.totalItems = response.result.page.totalElements;
        }
      });
    }

    function getWallet() {
      dataService.Wallet.get({}, function (response) {
        if (response.ret === 0) {
          vm.wallet = response.result;
        }
      });
    }

    function getFoudsInfo() {
      dataService.FundsInfo.get({}, function (response) {
        if (response.ret === 0) {
          vm.fundInfos = response.result;
        }
      });
    }

  }
}());
