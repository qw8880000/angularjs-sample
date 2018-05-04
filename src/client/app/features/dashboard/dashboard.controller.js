(function () {
'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  /* @ngInject */
  function DashboardController(accountService,
                               AGENTTYPE,
                               dataService) {

    var vm = this;
    vm.agent = accountService.getAgent();
    vm.user = accountService.userInfo;
    vm.shopsCount = 0;
    vm.goodsCount = 0;
    vm.ordersCount = 0;
    vm.regionAgentCount = 0;
    vm.isEstateAgent = isEstateAgent;

    var agentType = accountService.getAgentType();

    activate();

    ////////////////

    function activate() {
      if (isEstateAgent()) {
        getRegionAgentsInfo();
      } else {
        getShopsInfo();
        getGoodsInfo()
        getOrdersInfo();
      }
    }

    //
    // 商家总数
    function getShopsInfo() {
      dataService.ShopsInfo.get(function (response) {
        if (response.ret == 0) {
          angular.forEach(response.result, function (item) {
            vm.shopsCount += item.count;
          });
        }
      });
    }

    //
    // 商品总数
    function getGoodsInfo() {
      dataService.GoodsInfo.get(function (response) {
        if (response.ret == 0) {
          angular.forEach(response.result, function (item) {
            vm.goodsCount += item.count;
          });
        }
      });
    }

    //
    // 订单总数
    function getOrdersInfo() {
      dataService.OrdersInfo.get(function (response) {
        if (response.ret == 0) {
          angular.forEach(response.result, function (item) {
            vm.ordersCount += item.count;
          });
        }
      });
    }

    //
    // 区域运营商总数
    function getRegionAgentsInfo() {
      dataService.RegionAgentsInfo.get({}, function (response) {
        if (response.ret === 0) {
          vm.regionAgentCount = response.result.regionAgentCount;
        }
      });
    }

    function isEstateAgent() {
      return (AGENTTYPE.ESTATEAGENT === agentType) ? true : false;
    }
  }
}());
