(function () {
  'use strict';

  angular
    .module('app.goods')
    .controller('GoodsVisibilityController', GoodsVisibilityController);

  /* @ngInject */
  function GoodsVisibilityController(dataService,
                                     $state,
                                     communitySelectModal,
                                     dialogService,
                                     accountService,
                                     GOODSSTATE,
                                     PAGINATION) {
    var vm = this;
    vm.regionAgents = [];
    vm.currentRegionAgent = null;
    vm.communities = [];
    vm.goods = [];
    vm.search = {
      goodsName: '',      // 商品名称
      storeName: '',      // 商家名称
      platformSerial: '', // 平台货号
      goodsCategory: null,       // 商品分类
      community: null,        // 管辖社区
    };
    vm.searchAction = searchAction;
    vm.refresh = refresh;
    vm.navChanged = navChanged;
    vm.currentPage = 1;
    vm.totalItems = 0;
    vm.itemsPerPage = PAGINATION.ITEMSPERPAGE;

    vm.getCategoryInfo = getCategoryInfo;
    vm.viewGood = viewGood;
    vm.showVisibilitySetBtn = showVisibilitySetBtn;
    vm.showVisibilityCancelBtn = showVisibilityCancelBtn;
    vm.visibilitySet = visibilitySet;
    vm.visibilityCancel = visibilityCancel;

    var myselfRegionAgentId = accountService.getRegionAgentId();
    var myselfCommunities = accountService.getCommunities() || [];

    activate();

    ////////////////

    function activate() {
      getRegionAgents().$promise.then(function () {
        _initCurrentRegionAgent();
        _setCurrentCommunity();
        getData(getParams());
      });
    }

    function _initCurrentRegionAgent() {
      if (angular.isArray(vm.regionAgents)) {
        for (var i = 0; i < vm.regionAgents.length; i++) {
          if (vm.regionAgents[i].agentId === myselfRegionAgentId) {
            vm.currentRegionAgent = vm.regionAgents[i];
            break;
          }
        }
      }
    }

    function _setCurrentCommunity() {
      vm.communities = vm.currentRegionAgent.communities;   // for communities selectd element
      vm.search.community = angular.isArray(vm.communities) ? vm.communities[0] : null;
    }

    function refresh() {
      getData(getParams());
    }

    function navChanged() {
      _setCurrentCommunity();
      searchAction();
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

      if (angular.isString(vm.search.platformSerial) && vm.search.platformSerial !== '') {
        params.platformSerial = vm.search.platformSerial;
      }

      if (vm.search.goodsCategory !== null) {
        params.gcId = vm.search.goodsCategory.id;
      }

      //
      // 运营商底下无管辖社区时，搜索时也需要带上communityId字段，否则会把所有其他社区的商品搜索出来
      if (vm.search.community !== null) {
        params.communityId = vm.search.community.id;
      } else {
        params.communityId = '0';
      }

      //
      // 必备参数
      //
      params.goodsState = GOODSSTATE.SELLING;
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

    function getRegionAgents() {
      return dataService.RegionAgents.get({
        'page': 0,
        'size': 100,
      }, function (response) {
        if (response.ret === 0) {
          vm.regionAgents = response.result.data;
        }
      });
    }

    function getCategoryInfo(good) {
      if (angular.isDefined(good.goodsClass)) {
        return good.goodsClass.name;
      } else {
        return '无分类';
      }
    }

    function viewGood(good) {
      $state.go("home.goods.view", {'id': good.goodsId, 'good': good});
    }
    
    //
    // @brief 商品是否属于本运营商管辖下的社区
    //
    function isBelongsToOtherCommunity(good) {
      var i = 0, j = 0;
      var theCommunitiesGoodBelongTo = good.store.communities || [];
      for (i = 0; i < myselfCommunities.length; i++) {
        for (j = 0; j < theCommunitiesGoodBelongTo.length; j++) {
          if (myselfCommunities[i].id === theCommunitiesGoodBelongTo[j].id) {
            return false;
          }
        }
      }
      return true;
    }

    //
    // 是否显示 设置社区可见 按钮
    function showVisibilitySetBtn(good) {
      if (vm.currentRegionAgent.agentId !== myselfRegionAgentId && isBelongsToOtherCommunity(good)) {
        return true;
      } else {
        return false;
      }
    }

    //
    // 是否显示 取消社区可见 按钮
    function showVisibilityCancelBtn(good) {
      if (vm.currentRegionAgent.agentId === myselfRegionAgentId && isBelongsToOtherCommunity(good)) {
        return true;
      } else {
        return false;
      }
    }

    function _visibilitySet(goodId, communityIds) {
      dataService.Good.setVisibility({
        'goodsId': goodId,
        'communityIds': communityIds
      }).$promise.then(function (response) {
        if (response.ret === 0) {
          // dialogService.alert('操作成功');
          refresh();
        }
      });
    }

    // 设置社区可见
    function visibilitySet(good) {
      var communities = [];
      var communityIds = [];
      var params = {
        regionAgentId: myselfRegionAgentId,
        getCityByRegionAgentId: true,
      };

      communitySelectModal.open(params).then(function (result) {
        communities = result.currentCommunities;
        if (!angular.isArray(communities) || communities.length === 0) {
          dialogService.alert('请选择社区');
        } else {
          angular.forEach(communities, function (community) {
            communityIds.push(community.id);
            _visibilitySet(good.goodsId, communityIds);
          })
        }
      });
    }

    function visibilityCancel(good) {
      var message = "您确定将该商品取消社区可见? " + " 本运营商所管辖社区内的业主将无法浏览该商品.";
      dialogService.confirm(message, function () {
        _visibilitySet(good.goodsId, []);
      });
    }

  }
}());
