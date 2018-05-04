(function () {
'use strict';

  angular
    .module('app.orders')
    .controller('OrdersManageController', OrdersManageController);

  /* @ngInject */
  function OrdersManageController(dataService,
                                  dictionary,
                                  datetime,
                                  $state,
                                  DICTIONARY,
                                  PAGINATION) {
    var vm = this;
    vm.title = 'OrdersManageController';
    vm.orders = {};
    vm.orderStates = [];
    vm.deliveryMethods = [];
    vm.viewOrder = viewOrder;
    vm.viewGood = viewGood;
    vm.search = {
      orderSn: '',
      dateStart: '',
      dateEnd: '',
      orderState: null,
      storeName: '',
      deliveryMethod: null,
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

      dictionary.get(DICTIONARY.ORDERSTATE).then(function (value) {
        vm.orderStates = value;
      }, function () {
        vm.orderStates = [];
      });

      dictionary.get(DICTIONARY.DELIVERYMETHOD).then(function (value) {
        vm.deliveryMethods = value;
      }, function () {
        vm.deliveryMethods = [];
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

      if (angular.isString(vm.search.orderSn) && vm.search.orderSn !== '') {
        params.orderSn = vm.search.orderSn;
      }

      if (angular.isDate(vm.search.dateStart)) {
        params.startAddTime = datetime.getSecondTime(vm.search.dateStart);
      }

      if (angular.isDate(vm.search.dateEnd)) {
        params.endAddTime = datetime.getSecondTime(vm.search.dateEnd);
      }

      if (vm.search.orderState != null) {
        params.orderState = vm.search.orderState.id;
      }

      if (angular.isString(vm.search.storeName) && vm.search.storeName !== '') {
        params.storeName = vm.search.storeName;
      }

      if (vm.search.deliveryMethod != null) {
        params.deliveryMethods = vm.search.deliveryMethod.id;
      }

      params.page = vm.currentPage - 1;
      params.size = vm.itemsPerPage;

      return params;
    }

    function getData(params) {
      dataService.Orders.get(params, function (response) {
        if (response.ret === 0) {
          vm.orders = response.result.data;
          vm.totalItems = response.result.page.totalElements;
        }
      });
    }

    function viewOrder(order) {
      $state.go("home.orders.view", {'id': order.orderId, 'order': order});
    }

    function viewGood(good) {
      $state.go("home.goods.view", {'id': good.goods.goodsId, 'good': null});
    }
  }
}());
