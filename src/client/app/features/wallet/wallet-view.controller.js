(function () {
'use strict';

  angular
    .module('app.wallet')
    .controller('WalletViewController', WalletViewController);

  /* @ngInject */
  function WalletViewController(dataService, $stateParams, $state) {
    var vm = this;
    vm.items = [];
    vm.id = $stateParams.id;
    vm.fund = {};
    vm.viewOrder = viewOrder;

    activate();

    ////////////////

    function activate() {
        _getFund();
    }

    function _getFund() {
      dataService.Fund.get({
        id: vm.id
      }, function (response) {
        if (response.ret === 0) {
          vm.fund = response.result;
        }
      });
    }

    function viewOrder(fund) {
      $state.go("home.orders.view", {'id': fund.detail.orderId, 'order': fund.detail});
    }
  }
}());
