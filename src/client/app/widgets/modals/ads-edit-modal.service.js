(function () {
  'use strict';

  angular
    .module('app.widgets')
    .factory('adsEditModal', adsEditModal);

  /* @ngInject */
  function adsEditModal(ccwModal) {
    var service = {
      add: add,
      edit: edit,
    };
    return service;

    ////////////////

    function add(adsType) {
      return advertisement(adsType, 'add');
    }

    function edit(adsType, ad) {
      return advertisement(adsType, 'edit', ad);
    }

    function advertisement(adsType, action, ad) {

      var modalInstance = ccwModal.open({
        bodyClass: 'modal-open',
        templateUrl: 'app/widgets/modals/ads-edit-modal.html',
        controller: advertisementController,
        controllerAs: 'vm',
        resolve: {
          adsType: function () {
            return adsType;
          },
          action: function () {
            return action;
          },
          ad: function () {
            return ad;
          }
        },
      });

      return modalInstance.result;
    }


    /* @ngInject */
    function advertisementController($ccwModalInstance,
                                     imgUpload,
                                     imgCropperModal,
                                     goodsSelectModal,
                                     ADSTYPE,
                                     adsType,
                                     action,
                                     ad) {
      var vm = this;
      vm.ok = ok;
      vm.cancel = cancel;
      vm.close = cancel;
      vm.selectPic = selectPic;
      vm.selectGood = selectGood;
      vm.isGoodsAd = isGoodsAd;
      vm.previewStyle = {};

      vm.advertisement = {
        sort: null,
        name: null,
        link: null,
        imgUrl: null,
        goodsId: null,
        goodsName: null,
      };

      var isImgChanged = false;
      var croppedCanvas = null;
      var croppedBlob = null;
      var fileName = null;

      activate();

      //////////////////////////////////

      function activate() {
        //
        // init view
        if (adsType.image) {
          var ratio = adsType.image.width / adsType.image.height;
          var height = 300;
          vm.previewStyle = {
            'width': (height * ratio) + 'px',
            'height': height + 'px',
          };
        }

        //
        //
        if (action === 'edit') {
          vm.advertisement.imgUrl = ad.picUrl;  // 这里的url是一个地址
          vm.advertisement.name = ad.name;
          vm.advertisement.link = ad.linkUrl;
          vm.advertisement.sort = ad.sn;

          if (isGoodsAd()) {
            vm.advertisement.goodsId = ad.goodsId;
            vm.advertisement.goodsName = ad.goodsName;
          }
        }
      }

      function isGoodsAd() {
        return adsType === ADSTYPE.GOODS ? true : false;
      }

      function isStartupAd() {
        return adsType === ADSTYPE.STARTUP ? true : false;
      }

      function selectPic() {
        imgCropperModal.open({
          aspectRatio: adsType.image.width / adsType.image.height,
        }).then(function (result) {
          if (result) {
            croppedCanvas = result.croppedCanvas;
            fileName = result.file.name;
            isImgChanged = true;
            //
            // show cropped image
            vm.advertisement.imgUrl = result.croppedCanvas.toDataURL();
          }
        }, function () {
          // 消除 Possibly unhandled rejection: undefined
        });
      }
      
      function selectGood() {
        goodsSelectModal.open().then(function (result) {
          vm.advertisement.goodsId = result.goodsId;
          vm.advertisement.goodsName = result.goodsName;
        });
      }

      function isFormValid(adsForm) {
        if (isGoodsAd()) {
          return !!(adsForm.$valid && vm.advertisement.imgUrl !== null && vm.advertisement.goodsId !== null);
        } else {
          return !!(adsForm.$valid && vm.advertisement.imgUrl !== null);
        }
      }

      function uploadImgToQiniu() {
        return imgUpload.upload(croppedCanvas, 'ads', fileName, function (res) {
          vm.advertisement.imgUrl = res.url;
        });
      }

      function modalClose() {
        var result = {
          sort: vm.advertisement.sort,
          name: vm.advertisement.name,
          link: vm.advertisement.link,
          pic: vm.advertisement.imgUrl,
        };

        if (isGoodsAd()) {
          result.goodsId = vm.advertisement.goodsId;
          result.goodsName = vm.advertisement.goodsName;
        }

        $ccwModalInstance.close(result);
      }

      function ok(adsForm) {
        adsForm.$submitted = true;

        if (!isFormValid(adsForm)) {
          return;
        }

        if (action === 'add') {
          uploadImgToQiniu().then(function () {
            modalClose();
          });
        } else {    // edit
          if (isImgChanged) {
            uploadImgToQiniu().then(function () {
              modalClose();
            });
          } else {
            modalClose();
          }
        }
      }

      function cancel() {
        $ccwModalInstance.dismiss('cancel');
      }

    }
  }
}());
