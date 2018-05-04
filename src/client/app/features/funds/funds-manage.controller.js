(function () {
  'use strict';

  angular
    .module('app.funds')
    .controller('FundsManageController', FundsManageController);

  /* @ngInject */
  function FundsManageController(dataService,
                                 dictionary,
                                 DICTIONARY,
                                 datetime,
                                 PAGINATION) {
    var vm = this;
    vm.funds = [];
    vm.fundsInfo = [];
    vm.fundTypes = [];
    vm.payMethods = [];
    vm.search = {
      fundType: null,
      payMethod: null,
      serialNumber: null,
      beginTime: null,
      endTime: null,
    };
    vm.searchAction = searchAction;
    vm.refresh = refresh;
    vm.currentPage = 1;
    vm.totalItems = 0;
    vm.itemsPerPage = PAGINATION.ITEMSPERPAGE;

    vm.exportResult = exportResult;

    activate();

    ////////////////

    function activate() {
      getFundTypes().then(function () {
        vm.search.fundType = vm.fundTypes[0];
        getData(getParams());
      });

      getPayMethods();
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

      if (vm.search.fundType !== null && vm.search.fundType.id != -1) {
        params.typeId = vm.search.fundType.id;
      }
      if (vm.search.payMethod !== null) {
        params.methodId = vm.search.payMethod.id;
      }
      if (angular.isString(vm.search.serialNumber) && vm.search.serialNumber !== '') {
        params.serialNumber = vm.search.serialNumber;
      }
      if (angular.isDate(vm.search.beginTime)) {
        params.beginTime = datetime.getSecondTime(vm.search.beginTime);
      }
      if (angular.isDate(vm.search.endTime)) {
        params.endTime = datetime.getSecondTime(vm.search.endTime);
      }

      params.page = vm.currentPage - 1;
      params.size = vm.itemsPerPage;

      return params;
    }

    function getData(params) {
      getFunds(params);
      getFundsInfo(params);
    }

    function getFunds(params) {
      dataService.Funds.get(params, function (response) {
        if (response.ret === 0) {
          vm.funds = response.result.data;
          vm.totalItems = response.result.page.totalElements;
        }
      });
    }

    function getFundsInfo(params) {
      dataService.FundsInfo.get(params, function (response) {
        if (response.ret === 0) {
          vm.fundsInfo = response.result;
        }
      });
    }

    function getFundTypes() {
      return dictionary.get(DICTIONARY.TRANSACTIONTYPE).then(function (fundTypes) {
        vm.fundTypes = fundTypes;
        vm.fundTypes.push({id: '-1', name: '全部'});
        vm.fundTypes.sort(function (a, b) {
          return a.id - b.id;
        });
      });
    }

    function getPayMethods() {
      return dictionary.get(DICTIONARY.ORDERPAYMETHOD).then(function (payMethods) {
        vm.payMethods = payMethods;
        vm.payMethods.sort(function (a, b) {
          return a.id - b.id;
        });
      });
    }

    function exportResult() {
      // var params = getParams();
      // var exportBody = {
      //   path: '/mall/agent/getTransactionList',
      //   method: 'get',
      //   body: angular.extend(params, {
      //     methodId: '',
      //     typeId: '',
      //     page: 0,
      //     size: 100000
      //   }),
      //   sheet: [{
      //     name: '资金流水',
      //     head: ['流水号', '类型', '支付方式', '交易金额', '交易时间', '接收方'],
      //     col: ['serialNumber', 'type.name', 'method.name', 'amount|amount', 'createTime | datetime', 'accept']
      //   }]
      // };
      // $http.post("/api/custom/excel/export", exportBody, {responseType: "blob"}).then(function (data) {
      //   var blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
      //   var fileName = "资金流水";
      //   var a = document.createElement("a");
      //   document.body.appendChild(a);
      //   a.download = fileName;
      //   a.href = URL.createObjectURL(blob);
      //   a.click();
      // });
      // dataService.FileExport.get(exportBody, function (data) {
      //   var blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
      //   var fileName = "资金流水";
      //   var a = document.createElement("a");
      //   document.body.appendChild(a);
      //   a.download = fileName;
      //   a.href = URL.createObjectURL(blob);
      //   a.click();
      // });

    }

  }
}());
