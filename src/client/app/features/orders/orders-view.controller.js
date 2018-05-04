(function () {
  'use strict';

  angular
    .module('app.wallet')
    .controller('OrdersViewController', OrdersViewController);

  /* @ngInject */
  function OrdersViewController(dataService, $stateParams, $state) {
    var vm = this;
    vm.id = $stateParams.id;
    vm.order = $stateParams.order;
    vm.viewGood = viewGood;

    activate();

    ////////////////

    function activate() {
      if (vm.order === null) {
        _getOrder();
      }
    }

    function _getOrder() {
      dataService.Order.get({
        orderId: vm.id
      }, function (response) {
        if (response.ret === 0) {
          vm.order = response.result;
        }
      });
    }

    function viewGood(good) {
      $state.go("home.goods.view", {'id': good.goods.goodsId, 'good': null});
    }
  }
}());
