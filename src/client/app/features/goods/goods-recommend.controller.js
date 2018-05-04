(function () {
  'use strict';

  angular
    .module('app.goods')
    .controller('GoodsRecommendController', GoodsRecommendController);

  /* @ngInject */
  function GoodsRecommendController(dataService,
                                 $state,
                                 accountService,
                                 dictionary,
                                 dialogService,
                                 DICTIONARY,
                                 GOODSSTATE,
                                 GOODSRECOMMENDSTATE,
                                 PAGINATION) {
    var vm = this;
    vm.GOODSRECOMMENDSTATE = GOODSRECOMMENDSTATE;
    vm.goodsRecommendStates = [];
    vm.communities = accountService.getCommunities();
    vm.goods = [];
    vm.search = {
      goodsName: '',      // 商品名称
      storeName: '',      // 商家名称
      platformSerial: '', // 平台货号
      goodsCategory: null,       // 商品分类
      community: null,        // 管辖社区
      recommendState: null,  // 已推荐|未推荐
    };
    vm.searchAction = searchAction;
    vm.refresh = refresh;
    vm.currentPage = 1;
    vm.totalItems = 0;
    vm.itemsPerPage = PAGINATION.ITEMSPERPAGE;

    vm.getCategoryInfo = getCategoryInfo;
    vm.viewGood = viewGood;
    vm.hasRecommendButton = hasRecommendButton;
    vm.hasUnRecommendButton = hasUnRecommendButton;
    vm.goodRecommend = goodRecommend;
    vm.goodUnRecommend = goodUnRecommend;

    activate();

    ////////////////

    function activate() {
      getGoodsRecommendState().then(function () {
        if (angular.isArray(vm.communities)) {
          vm.search.community = vm.communities[0];    // 设置默认值
        }
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

      if (angular.isString(vm.search.platformSerial) && vm.search.platformSerial !== '') {
        params.platformSerial = vm.search.platformSerial;
      }

      if (vm.search.goodsCategory !== null) {
        params.gcId = vm.search.goodsCategory.id;
      }

      if (vm.search.recommendState !== null) {
        params.goodsCommend = vm.search.recommendState.id;
      }

      if (vm.search.community !== null) {
        params.communityId = vm.search.community.id;
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

    function getGoodsRecommendState() {
      return dictionary.get(DICTIONARY.GOODRECOMMENDSTATE).then(function (goodsRecommendStates) {
        vm.goodsRecommendStates = goodsRecommendStates;
        vm.search.recommendState = goodsRecommendStates[0]; // 设置默认值
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

    function inCurrentCommunity(recommends) {
      var currentCommunity = vm.search.community;

      for(var i = 0; i < recommends.length; i++) {
        if (currentCommunity.id === recommends[i].community.id) {
          return true;
        }
      }

      return false;
    }

    function hasRecommendButton(recommends) {
      if (angular.isUndefined(recommends) || !inCurrentCommunity(recommends)) {
        return true;
      } else {
        return false;
      }
    }

    function hasUnRecommendButton(recommends) {
      if (angular.isDefined(recommends) && inCurrentCommunity(recommends)) {
        return true;
      } else {
        return false;
      }
    }

    function goodRecommend(good) {
      var message = '确认推荐' + good.store.storeName + ' 的 ' +  good.goodsName + '?';
      var recommends = [];
      var currentCommunityId = vm.search.community.id;

      recommends.push({"goodsId":good.goodsId, "communityId": currentCommunityId});

      dialogService.confirm(message, function () {
        dataService.Good.recommend({
          'commendList': recommends,
        }).$promise.then(function (response) {
          if (response.ret === 0) {
            // dialogService.alert('操作成功');
            refresh();
          }
        });
      });
    }

    function goodUnRecommend(good) {
      var message = '确认取消推荐' + good.store.storeName + ' 的 ' +  good.goodsName + '?';
      var unRecommends = [];
      var currentCommunityId = vm.search.community.id;

      unRecommends.push({"goodsId":good.goodsId, "communityId": currentCommunityId});

      dialogService.confirm(message, function () {
        dataService.Good.unRecommend({
          'uncommendList': unRecommends,
        }).$promise.then(function (response) {
          if (response.ret === 0) {
            // dialogService.alert('操作成功');
            refresh();
          }
        });
      });
    }

  }
}());
