(function () {
'use strict';

  angular
    .module('app.shops')
    .controller('ShopsEditController', ShopsEditController);

  /* @ngInject */
  function ShopsEditController($stateParams,
                               dataService,
                               accountService,
                               imgCropperModal,
                               dialogService,
                               imgUpload,
                               $q,
                               datetime,
                               communitySelectModal) {

    var vm = this;
    vm.shopId = $stateParams.id;
    vm.shop = $stateParams.shop;
    vm.shopExtend = {};
    vm.communitySelect = communitySelect;
    vm.delectCommunity = delectCommunity;
    vm.currentCommunities = [];
    vm.tabs = [{id: 1, name: '基础信息'}, {id: 2, name: '其他信息'}];
    vm.currentTab = vm.tabs[0];
    vm.submitShopForm = submitShopForm;
    vm.submitShopExtendForm = submitShopExtendForm;

    vm.businessLicenceEnd = null;
    vm.businessLicenceStart = null;

    // 商家图片
    vm.storeAvatar = null;
    vm.storeAvatarSelect = storeAvatarSelect;
    var isStoreAvatarChanged = false;
    var storeAvatarCanvas;
    var storeAvatarFileName;

    // 身份证
    vm.identityCardPicUrl = null;
    vm.identityCardPicSelect = identityCardPicSelect;
    var isIdentityCardPicFileChanged = false;
    var identityCardPicCanvas;
    var identityCardPicFileName;

    // 营业执照
    vm.businessLicenceNumberElectronic = null;
    vm.businessLicenceNumberElectronicSelect = businessLicenceNumberElectronicSelect;
    var isBusinessLicenceNumberElectronicChanged = false;
    var businessLicenceNumberElectronicCanvas;
    var businessLicenceNumberElectronicFileName;

    // 组织机构代码证
    vm.organizationCodeElectronic = null;
    vm.organizationCodeElectronicSelect = organizationCodeElectronicSelect;
    var isOrganizationCodeElectronicChanged = false;
    var organizationCodeElectronicCanvas;
    var organizationCodeElectronicFileName;

    //税务登记证
    vm.taxRegistrationCertificateElectronic = null;
    vm.taxRegistrationCertificateElectronicSelect = taxRegistrationCertificateElectronicSelect;
    var isTaxRegistrationCertificateElectronicChanged = false;
    var taxRegistrationCertificateElectronicCanvas;
    var taxRegistrationCertificateElectronicFileName;

    var regionAgentId = accountService.getRegionAgentId();

    activate();

    ////////////////

    function activate() {
      if (vm.shop === null) {
        _getShop().$promise.then(function () {
          vm.storeAvatar = vm.shop.storeAvatar;
        });
      } else {
        vm.storeAvatar = vm.shop.storeAvatar;
      }

      _getShopExtend().$promise.then(function (response) {
        if (response.ret === 0) {
          if (vm.shopExtend.businessLicence.businessLicenceStart) {
            vm.businessLicenceStart = new Date(vm.shopExtend.businessLicence.businessLicenceStart);
          }
          if (vm.shopExtend.businessLicence.businessLicenceEnd) {
            vm.businessLicenceEnd = new Date(vm.shopExtend.businessLicence.businessLicenceEnd);
          }

          vm.identityCardPicUrl = vm.shopExtend.identity.identityCardUrl;
          vm.businessLicenceNumberElectronic = vm.shopExtend.businessLicence.businessLicenceNumberElectronic;
          vm.organizationCodeElectronic = vm.shopExtend.organization.organizationCodeElectronic;
          vm.taxRegistrationCertificateElectronic = vm.shopExtend.taxRegistration.taxRegistrationCertificateElectronic;
        }
      });
    }

    function _getShop() {
      return dataService.Shop.get({
        storeId: vm.shopId,
      }, function (response) {
        if (response.ret === 0) {
          vm.shop = response.result;
        }
      });
    }

    function _getShopExtend() {
      return dataService.ShopExtend.get({
        storeId: vm.shopId,
      }, function (response) {
        if (response.ret === 0) {
          vm.shopExtend = response.result;
        }
      });
    }
    
    function communitySelect() {
      var currentCommunities = angular.copy(vm.shop.communities);
      var params = {
        regionAgentId: regionAgentId,
        currentCommunities: currentCommunities,
        getCityByRegionAgentId: true,
      };

      communitySelectModal.open(params).then(function (result) {
        vm.shop.communities = result.currentCommunities;
      });
    }

    function delectCommunity(community) {
      var message = '确认删除社区 ' + community.name + '?';
      var communities = vm.shop.communities;
      var index = (angular.isArray(communities)) ? communities.indexOf(community) : -1;

      if (index >= 0) {
        dialogService.confirm(message, function () {
          communities.splice(index, 1);
        });
      }
    }
    
    function submitShopForm(shopForm) {
      var communityIds = [];
      var promiseArray = [];

      if (shopForm.$invalid) {
        return;
      }

      angular.forEach(vm.shop.communities, function (community) {
        communityIds.push(community.id);
      });

      if (isStoreAvatarChanged) {
        promiseArray.push(storeAvatarUpload());
      }

      $q.all(promiseArray).then(function () {
        dataService.Shop.set({
          'storeId': vm.shopId,
          'sellerName': vm.shop.seller.name,
          'storeName': vm.shop.storeName,
          'storePhone': vm.shop.storePhone,
          'storeAddress': vm.shop.storeAddress,
          'storeAvatar': vm.shop.storeAvatar,
          'storeEmail': vm.shop.storeEmail,
          'profitSharingRate': vm.shop.profitSharingRate,
          'communityIds': communityIds
        }, function (response) {
          if (response.ret === 0) {
            dialogService.alert('保存成功');
          }
        });
      });
    }

    function storeAvatarSelect() {
      imgCropperModal.open({
      }).then(function (result) {
        if (result) {
          isStoreAvatarChanged = true;
          storeAvatarCanvas = result.croppedCanvas;
          storeAvatarFileName = result.file.name;
          //
          // show cropped image
          vm.storeAvatar = result.croppedCanvas.toDataURL();
        }
      }, function () {
        // 消除 Possibly unhandled rejection: undefined
      });
    }

    function storeAvatarUpload() {
      return imgUpload.upload(storeAvatarCanvas, 'img', storeAvatarFileName, function (res) {
        vm.shop.storeAvatar = res.url;
      });
    }
    
    function submitShopExtendForm(shopFormExtend) {
      var promiseArray = [];

      if (shopFormExtend.$invalid) {
        return;
      }

      if (isIdentityCardPicFileChanged) {
        promiseArray.push(identityCardPicUpload());
      }
      if (isBusinessLicenceNumberElectronicChanged) {
        promiseArray.push(businessLicenceNumberElectronicUpload());
      }
      if (isOrganizationCodeElectronicChanged) {
        promiseArray.push(organizationCodeElectronicUpload());
      }
      if (isTaxRegistrationCertificateElectronicChanged) {
        promiseArray.push(taxRegistrationCertificateElectronicUpload());
      }

      if (angular.isDate(vm.businessLicenceStart)) {
        vm.shopExtend.businessLicence.businessLicenceStart = datetime.formatDateTime(vm.businessLicenceStart);
      }
      if (angular.isDate(vm.businessLicenceEnd)) {
        vm.shopExtend.businessLicence.businessLicenceEnd = datetime.formatDateTime(vm.businessLicenceEnd);
      }

      $q.all(promiseArray).then(function (resolves) {
        dataService.ShopExtend.set({
          'storeId': vm.shopId,
          // 'companyName': '',
          // 'companyProvinceId': '',
          // 'companyAddress': '',
          // 'companyAddressDetail': '',
          // 'companyPhone': '',
          // 'companyEmployeeCount': '',
          // 'companyRegisteredCapital': '',
          // 'contactsName': '',
          // 'contactsPhone': '',
          // 'contactsEmail': '',
          'businessLicenceNumber': vm.shopExtend.businessLicence.businessLicenceNumber,   // 营业执照号
          'businessName': vm.shopExtend.businessLicence.businessName,   // 营业执照名称
          'businessCreditCode': vm.shopExtend.businessLicence.businessCreditCode,   // 统一社会信用代码
          'businessLegalPerson': vm.shopExtend.businessLicence.businessLegalPerson,   // 法定代表人
          'businessLicenceAddress': vm.shopExtend.businessLicence.businessLicenceAddress, // 营业执照所在地
          'businessLicenceStart': vm.shopExtend.businessLicence.businessLicenceStart,
          'businessLicenceEnd': vm.shopExtend.businessLicence.businessLicenceEnd,
          'businessSphere': vm.shopExtend.businessLicence.businessSphere,   // 法定经营范围
          'businessLicenceNumberElectronic': vm.shopExtend.businessLicence.businessLicenceNumberElectronic, // 营业执照
          'organizationCode': vm.shopExtend.organization.organizationCode,  // 组织机构代码
          'organizationCodeElectronic': vm.shopExtend.organization.organizationCodeElectronic,  // 组织机构代码证
          'generalTaxpayer': vm.shopExtend.generalTaxpayer.generalTaxpayer, // 一般纳税人证明
          'bankName': vm.shopExtend.bank.bankName,  // 银行名称
          'bankSubsidiaryName': vm.shopExtend.bank.bankSubsidiaryName,  // 支行名称
          'bankCode': vm.shopExtend.bank.bankCode,    // 支行银行号
          'bankAddress': vm.shopExtend.bank.bankAddress,  // 支行所在地
          'bankLicenceElectronic': '',
          'bankAccountName': vm.shopExtend.bank.bankAccountName,  // 银行户名
          'bankAccountNumber': vm.shopExtend.bank.bankAccountNumber,  // 银行账号
          'taxpayerId': vm.shopExtend.taxRegistration.taxpayerId,   // 税务登记证号
          'taxRegistrationCertificate': vm.shopExtend.taxRegistration.taxRegistrationCertificate, // 纳税人识别号
          'taxRegistrationCertificateElectronic': vm.shopExtend.taxRegistration.taxRegistrationCertificateElectronic, // 税务登记证
          'identityCard': vm.shopExtend.identity.identityCard,    // 身份证号码
          'identityCardName': vm.shopExtend.identity.identityCardName,  // 身份证姓名
          'identityCardUrl': vm.shopExtend.identity.identityCardUrl,    // 身份证照片
        }, function (response) {
          if (response.ret === 0) {
            dialogService.alert('保存成功');
          }
        });

      });
    }
    
    function identityCardPicSelect() {
      imgCropperModal.open({
      }).then(function (result) {
        if (result) {
          isIdentityCardPicFileChanged = true;
          identityCardPicCanvas = result.croppedCanvas;
          identityCardPicFileName = result.file.name;
          //
          // show cropped image
          vm.identityCardPicUrl = result.croppedCanvas.toDataURL();
        }
      }, function () {
        // 消除 Possibly unhandled rejection: undefined
      });
    }
    
    function identityCardPicUpload() {
      return imgUpload.upload(identityCardPicCanvas, 'img', identityCardPicFileName, function (res) {
        vm.shopExtend.identity.identityCardUrl = res.url;
      });
    }

    function businessLicenceNumberElectronicSelect() {
      imgCropperModal.open({
      }).then(function (result) {
        if (result) {
          isBusinessLicenceNumberElectronicChanged = true;
          businessLicenceNumberElectronicCanvas = result.croppedCanvas;
          businessLicenceNumberElectronicFileName = result.file.name;
          //
          // show cropped image
          vm.businessLicenceNumberElectronic = result.croppedCanvas.toDataURL();
        }
      }, function () {
        // 消除 Possibly unhandled rejection: undefined
      });
    }

    function businessLicenceNumberElectronicUpload() {
      return imgUpload.upload(businessLicenceNumberElectronicCanvas, 'img', businessLicenceNumberElectronicFileName, function (res) {
        vm.shopExtend.businessLicence.businessLicenceNumberElectronic = res.url;
      });
    }

    function organizationCodeElectronicSelect() {
      imgCropperModal.open({
      }).then(function (result) {
        if (result) {
          isOrganizationCodeElectronicChanged = true;
          organizationCodeElectronicCanvas = result.croppedCanvas;
          organizationCodeElectronicFileName = result.file.name;
          //
          // show cropped image
          vm.organizationCodeElectronic = result.croppedCanvas.toDataURL();
        }
      }, function () {
        // 消除 Possibly unhandled rejection: undefined
      });
    }


    function organizationCodeElectronicUpload() {
      return imgUpload.upload(organizationCodeElectronicCanvas, 'img', organizationCodeElectronicFileName, function (res) {
        vm.shopExtend.organization.organizationCodeElectronic = res.url;
      });
    }

    function taxRegistrationCertificateElectronicSelect() {
      imgCropperModal.open({
      }).then(function (result) {
        if (result) {
          isTaxRegistrationCertificateElectronicChanged = true;
          taxRegistrationCertificateElectronicCanvas = result.croppedCanvas;
          taxRegistrationCertificateElectronicFileName = result.file.name;
          //
          // show cropped image
          vm.taxRegistrationCertificateElectronic = result.croppedCanvas.toDataURL();
        }
      }, function () {
        // 消除 Possibly unhandled rejection: undefined
      });
    }

    function taxRegistrationCertificateElectronicUpload() {
      return imgUpload.upload(taxRegistrationCertificateElectronicCanvas, 'img', taxRegistrationCertificateElectronicFileName, function (res) {
        vm.shopExtend.taxRegistration.taxRegistrationCertificateElectronic = res.url;
      });
    }
    
  }
}());
