(function () {
'use strict';

  angular
    .module('app.goods')
    .controller('GoodsManageController', GoodsManageController);

  /* @ngInject */
  function GoodsManageController(dataService,
                                 $state,
                                 accountService,
                                 dictionary,
                                 dialogService,
                                 DICTIONARY,
                                 GOODSSTATE,
                                 PAGINATION) {
    var vm = this;
    vm.GOODSSTATE = GOODSSTATE;
    vm.goodsStates = [];
    vm.goods = [];
    vm.search = {
      goodsName: '',      // 商品名称
      storeName: '',      // 商家名称
      goodsState: null,    // 商品状态
      platformSerial: '', // 平台货号
      goodsCategory: null,       // 商品分类
    };
    vm.searchAction = searchAction;
    vm.refresh = refresh;
    vm.currentPage = 1;
    vm.totalItems = 0;
    vm.itemsPerPage = PAGINATION.ITEMSPERPAGE;

    vm.getCategoryInfo = getCategoryInfo;
    vm.goodCheckingPass = goodCheckingPass;
    vm.goodCheckingReject = goodCheckingReject;
    vm.goodPullOff = goodPullOff;
    vm.goodForbid = goodForbid;
    vm.goodPullOn = goodPullOn;
    vm.viewGood = viewGood;

    activate();

    ////////////////

    function activate() {
      getGoodsStates().then(function () {
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

      //
      // 搜索参数
      //
      if (angular.isString(vm.search.goodsName) && vm.search.goodsName !== '') {
        params.goodsName = vm.search.goodsName;
      }

      if (angular.isString(vm.search.storeName) && vm.search.storeName !== '') {
        params.storeName = vm.search.storeName;
      }

      if (vm.search.goodsState !== null && vm.search.goodsState.id !== '-1') {
        params.goodsState = vm.search.goodsState.id;
      }

      if (angular.isString(vm.search.platformSerial) && vm.search.platformSerial !== '') {
        params.platformSerial = vm.search.platformSerial;
      }

      if (vm.search.goodsCategory !== null) {
        params.gcId = vm.search.goodsCategory.id;
      }

      //
      // 必备参数
      //
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

    function getGoodsStates() {
      return dictionary.get(DICTIONARY.GOODSTATE).then(function (goodsStates) {
        var goodsStateAll = {'id': '-1', 'name': '全部', show: true, priority: '0'};

        vm.search.goodsState = goodsStateAll;   // 设置默认值

        angular.forEach(goodsStates, function (item) {
          var state = angular.copy(item);
          if (state.id !== GOODSSTATE.UNPUBLISHED) {     // 待发布 状态不显示
            state.priority = state.id + 1;
            vm.goodsStates.push(state);
          }
        });
        vm.goodsStates.push(goodsStateAll);
      });
    }

    function getCategoryInfo(good) {
      if (angular.isDefined(good.goodsClass)) {
        return good.goodsClass.name;
      } else {
        return '无分类';
      }
    }

    function confirmProcess(good, process, action, params) {
      var message = '确认' + process + good.store.storeName + ' 的 ' +  good.goodsName + '?';
      params = params || {"goodsId": good.goodsId};

      dialogService.confirm(message, function () {
        action(params).$promise.then(function (response) {
          if (response.ret === 0) {
            // dialogService.alert('操作成功');
            refresh();
          }
        });
      });
    }

    function goodCheckingPass(good) {
      confirmProcess(good, '审核通过', dataService.Good.verifyPass);
    }

    function goodCheckingReject(good) {
      var message = '确认审核不通过 ' + good.store.storeName + ' 的 ' +  good.goodsName + '？ 请输入原因';
      dialogService.prompt(message, function (userInput) {
        dataService.Good.verifyReject({
          "goodsId": good.goodsId,
          "rejectedInfo": userInput,
        }).$promise.then(function (response) {
          if (response.ret === 0) {
            // dialogService.alert('操作成功');
            refresh();
          }
        });
      });
    }

    function goodPullOff(good) {
      confirmProcess(good, '下架', dataService.Good.pullOff);
    }

    function goodForbid(good) {
      var message = '确认禁售 ' + good.store.storeName + ' 的 ' +  good.goodsName + '？ 请输入原因';
      dialogService.prompt(message, function (userInput) {
        dataService.Good.forbid({
          "goodsId": good.goodsId,
          "goodsStateRemark": userInput,
        }).$promise.then(function (response) {
          if (response.ret === 0) {
            // dialogService.alert('操作成功');
            refresh();
          }
        });
      });
    }

    function goodPullOn(good) {
      confirmProcess(good, '上架', dataService.Good.pullOn);
    }

    function viewGood(good) {
      $state.go("home.goods.view", {'id': good.goodsId, 'good': good});
    }

  }
}());
