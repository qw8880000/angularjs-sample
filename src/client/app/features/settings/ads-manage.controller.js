(function () {
'use strict';

  angular
    .module('app.settings')
    .controller('AdsManageController', AdsManageController);

  /* @ngInject */
  function AdsManageController($stateParams,
                               accountService,
                               dialogService,
                               ADSTYPE,
                               adsEditModal,
                               dataService) {
    var vm = this;
    vm.adsType = $stateParams.adsType;
    vm.ads = [];
    var regionAgentId = accountService.getRegionAgentId();
    vm.add = add;
    vm.del = del;
    vm.edit = edit;
    vm.isGoodsAd = isGoodsAd;

    activate();

    ////////////////

    function activate() {
      getAds();
      initView();
    }

    function initView() {
      var ratio = vm.adsType.image.width / vm.adsType.image.height;
      var width = 400;
      var height = width / ratio;

      vm.carouselStyle = {
        'width': width + 'px',
        'height': height + 'px'
      };

      vm.carouselImageStyle = {
        'max-width': width + 'px',
        'max-height': height + 'px'
      };
    }

    function getAds() {
      dataService.Advertisement.get({
        'regionAgentId': regionAgentId,
        'type': vm.adsType.id,
      }, function (response) {
        if (response.ret === 0) {
          vm.ads = response.result.data;
          sortAds(vm.ads);
        }
      });
    }

    function setAds(ads) {
      dataService.Advertisement.set({
        'regionAgentId': regionAgentId,
        'data': ads,
        'type': vm.adsType.id,
      });
    }

    function sortAds(ads) {
      var id = 0;

      if (!angular.isArray(ads)) {
        return;
      }

      // sort by: sn
      ads.sort(function (a, b) {
        return a.sn - b.sn;
      });

      // add property: id
      angular.forEach(ads, function (ad) {
        ad.id = id;
        id++;
      });
    }

    function indexOf(ads, ad) {
      var i = 0;

      if (!angular.isArray(ads)) {
        return -1;
      }

      for (i = 0; i < ads.length; i++) {
        if (ads[i] == ad) {
          return i;
          break;
        }
      }

      return -1;
    }

    function isGoodsAd() {
      return vm.adsType === ADSTYPE.GOODS ? true : false;
    }

    function formateAdFormResult(result) {
      var ad = {
        // linkUrl: 跳转地址
        // name: 广告主题
        // picUrl: 图片地址
        // sn: 排序

        // 'goodsId': vm.advertisementGoodsId,
        // 'goodsName': vm.advertisementGoodsName,
      };

      ad.linkUrl = result.link;
      ad.name = result.name;
      ad.picUrl = result.pic;
      ad.sn = result.sort;

      if (isGoodsAd()) {
        ad.goodsId = result.goodsId;
        ad.goodsName = result.goodsName;
      }

      return ad;
    }
    
    function add() {
      var ad;
      adsEditModal.add(vm.adsType).then(function (result) {
        ad = formateAdFormResult(result);

        vm.ads.push(ad);
        sortAds(vm.ads);
        setAds(vm.ads);
      }, function () {/*消除warning*/});
    }

    function del(ad) {
      var message = '确认要删除广告：' + ad.name;
      var index = indexOf(vm.ads, ad);

      dialogService.confirm(message, function () {
        vm.ads.splice(index, 1);
        setAds(vm.ads);
      });
    }

    function edit(ad) {
      var adEdited = {};
      var index;

      adsEditModal.edit(vm.adsType, ad).then(function (result) {
        adEdited = formateAdFormResult(result);

        index = indexOf(vm.ads, ad);
        vm.ads.splice(index, 1, adEdited);
        sortAds(vm.ads);
        setAds(vm.ads);

      }, function () {/*消除warning*/});
    }

  }
}());
