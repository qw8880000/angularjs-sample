(function () {
'use strict';

  angular
    .module('app.shops')
    .controller('ShopsManageController', ShopsManageController);

  /* @ngInject */
  function ShopsManageController(dataService,
    $state,
    dialogService,
    SHOPSTATE,
    PAGINATION) {

    var vm = this;
    vm.shops = [];
    vm.search = {
      shopName: '',
      shopOwner: '', 
      shopState: '0',
    };
    vm.searchAction = searchAction;
    vm.refresh = refresh;
    vm.currentPage = 1;
    vm.totalItems = 0;
    vm.itemsPerPage = PAGINATION.ITEMSPERPAGE;

    vm.isShopClosed = isShopClosed;
    vm.edit = edit;
    vm.close = close;
    vm.open = open;
    vm.del = del;
    
    activate();

    ////////////////

    function activate() {
      getData(getParams());
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

      if (angular.isString(vm.search.shopName) && vm.search.shopName !== '') {
        params.storeName = vm.search.shopName;
      }

      if (angular.isString(vm.search.shopOwner) && vm.search.shopOwner !== '') {
        params.sellerName = vm.search.shopOwner;
      }

      if (angular.isString(vm.search.shopState) && vm.search.shopState !== '0') {
        params.storeState = getShopState(vm.search.shopState);
      }

      params.page = vm.currentPage - 1;
      params.size = vm.itemsPerPage;

      return params;
    }

    function getData(params) {
      dataService.Shops.get(params, function (response) {
        if (response.ret === 0) {
          vm.shops = response.result.data;
          vm.totalItems = response.result.page.totalElements;
        }
      });
    }

    function getShopState(value) {
      if (value === '2') {
        return SHOPSTATE.CLOSE;
      } else {
        return SHOPSTATE.OPEN;
      }
    }

    function isShopClosed(shop) {
      if (shop && shop.storeState.id == SHOPSTATE.OPEN) {
        return false;
      } else {
        return true;
      }
    }

    function edit(shop) {
      $state.go('home.shops.edit', {
        id: shop.storeId,
        shop: shop,
      });
    }

    function close(shop) {
      var message = "您确定要关闭商家 " + shop.storeName + " ?";

      dialogService.prompt(message, function (userInput) {
        dataService.Shop.close({
          'storeId': shop.storeId,
          'closeInfo': userInput || '',
        }, function () {
          refresh();
        });
      });
    }

    function open(shop) {
      var message = "您确定要开启商家 " + shop.storeName + " ?";

      dialogService.confirm(message, function () {
        dataService.Shop.open({
          'storeId': shop.storeId,
        }, function () {
          refresh();
        });
      });
    }

    function del(shop) {
      var message = "您确定要删除商家 " + shop.storeName + " ?";

      dialogService.confirm(message, function () {
        dataService.Shop.del({
          'storeId': shop.storeId,
        }, function () {
          refresh();
        });
      });
    }

  }
}());
