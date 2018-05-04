(function () {
  'use strict';

  angular
    .module('app.widgets')
    .factory('goodsSelectModal', goodsSelectModal);

  /* @ngInject */
  function goodsSelectModal(ccwModal) {
    var service = {
      open: open
    };
    return service;

    ////////////////

    function open(params) {
      var modalInstance = ccwModal.open({
        bodyClass: 'modal-open',
        templateUrl: 'app/widgets/modals/goods-select-modal.html',
        controller: goodsSelectController,
        controllerAs: 'vm',
        resolve: {
          params: function () {
            return params;
          }
        },
      });

      return modalInstance.result;
    }

    /* @ngInject */
    function goodsSelectController($ccwModalInstance,
                                   GOODSSTATE,
                                   dataService,
                                   dialogService,
                                   accountService,
                                   params) {
      var vm = this;
      vm.ok = ok;
      vm.cancel = cancel;
      vm.close = cancel;
      vm.goods = [];
      vm.selectGood = null;
      vm.search = {
        goodsName: '',
      };
      vm.searchAction = searchAction;
      vm.refresh = refresh;
      vm.currentPage = 1;
      vm.totalItems = 0;
      vm.itemsPerPage = 2;

      activate()

      //////////////////////////////////

      function activate() {
        getData(getParams());
      }

      function searchAction() {
        vm.currentPage = 1;     // 只要一点击搜索，统一回到第1页
        getData(getParams());
      }

      function refresh() {
        getData(getParams());
      }

      function getParams() {
        var params = {};
        //
        // 搜索参数
        //
        if (angular.isString(vm.search.goodsName) && vm.search.goodsName !== '') {
          params.goodsName = vm.search.goodsName;
        }
        //
        // 必备参数
        //
        params.goodsState = GOODSSTATE.SELLING;
        params.regionAgentId = accountService.getRegionAgentId();
        params.page = vm.currentPage - 1;
        params.size = vm.itemsPerPage;

        return params;
      }

      function getData(params) {
        dataService.Goods.get(params, function (response) {
          if (response.ret === 0) {
            vm.goods = response.result.data;
            vm.totalItems = response.result.page.totalElements;
          }
        });
      }

      function ok() {
        if (vm.selectGood === null) {
          dialogService.alert('请选择商品');
        } else {
          $ccwModalInstance.close({
            'goodsId': vm.selectGood.goodsId,
            'goodsName': vm.selectGood.goodsName,
          });
        }
      }

      function cancel() {
        $ccwModalInstance.dismiss('cancel');
      }

    }

  }
}());
