(function () {
  'use strict';

  angular
    .module('app.core')
    .factory('dataService', dataService);

  /* @ngInject */
  function dataService($resource) {
    var service = {
      NavItems: {
        get: $resource('resources/nav-items.json').query,
      },

      /* ----------------------------------
       * 不需要权限的api
       * ---------------------------------- */
      UiConfig: {
        get: $resource('/api/custom/appInfo/uiConfig').get,
      },

      Account: {
        login: $resource('/api/role/agent/login').save,
      },

      Password: {
        set: $resource('/api/role/base/updatePassword').save,
        reset: $resource('/api/role/base/forgetPassword').save,
      },

      VerifyPic: {
        get: $resource("/api/custom/verify/getPic").get,
        check: $resource('/api/custom/verify/checkPic').save,
      },

      VerifyCode: {
        get: $resource('/api/role/base/sendVerifyCode').save,
      },

      /* ----------------------------------
       * 需要权限的api
       * ---------------------------------- */

      /* app信息
         ---------------------------------- */
      UserInfo: {
        get: $resource('/api/role/base/getUserInfo').get,
        set: $resource('/api/role/base/improveUserInfo').save,
      },

      AppInfo: {
        get: $resource('/api/appInfo/webapp/agent').get,
      },

      /* 区域运营商
         ---------------------------------- */
      RegionAgentsInfo: {
        get: $resource('/api/mall/agent/getStatistics').get,
      },
      RegionAgents: {
        get: $resource('/api/mall/agent/getList').get,
      },
      RegionAgent: {
        create: $resource('/api/role/agent/register').save,
        get: $resource('/api/mall/agent/getDetail').save,
        del: $resource('/api/mall/agent/delete').save,
        set: $resource('/api/mall/agent/updateAgent').save,
      },

      /* 社区
       ---------------------------------- */
      Cities: {
        get: $resource('/api/mall/community/getCity').get,
      },
      Communities: {
        get: $resource('/api/mall/community/getList').get,
      },

      /* 商品 
         ---------------------------------- */
      ShopsInfo: {
        get: $resource('/api/mall/shop/getAgentStatistics').get,
      },
      Shops: {
        get: $resource('/api/mall/shop/getList').get,
      },
      Shop: {
        get: $resource('/api/mall/shop/getDetail').save,
        set: $resource('/api/mall/shop/updateStore').save,
        del: $resource('/api/mall/shop/delete').save,
        close: $resource('/api/mall/shop/closeStore').save,
        open: $resource('/api/mall/shop/openStore').save,
      },
      ShopExtend: {     // 公司 营业执照 组织机构 结算银行...
        get: $resource('/api/mall/shop/getJoinin').save,
        set: $resource('/api/mall/shop/updateJoin').save,
      },

      /* 商品
         ---------------------------------- */
      GoodsInfo: {
        get: $resource('/api/mall/goods/getAgentStatistics').get,
      },
      Goods: {
        get: $resource('/api/mall/goods/getList').get,
      },
      GoodsCategories: {
        get: $resource('/api/mall/goods/getClassList').get,
      },
      Good: {
        get: $resource('/api/mall/goods/getDetail').save,
        verifyPass: $resource('/api/mall/goods/passVerify').save,
        verifyReject: $resource('/api/mall/goods/rejectedVerify').save,
        pullOff: $resource('/api/mall/goods/pullOff').save,
        pullOn: $resource('/api/mall/goods/pullOn').save,
        forbid: $resource('/api/mall/goods/banGoods').save,
        recommend: $resource('/api/mall/goods/commend').save,
        unRecommend: $resource('/api/mall/goods/uncommend').save,
        setVisibility: $resource('/api/mall/goods/relateCommunity').save
      },
      GoodDescription: {
        get: $resource('/api/custom/getHtmlData').save,
      },
      GoodsCategoriesShowed: {
        create: $resource('/api/mall/goodsClass/createShow').save,
        get: $resource('/api/mall/goodsClass/getShowList').get,
        set: $resource('/api/mall/goodsClass/updateShow').save,
        del: $resource('/api/mall/goodsClass/deleteShow').save,
      },


      /* 订单
         ---------------------------------- */
      OrdersInfo: {
        get: $resource('/api/mall/order/getAgentStatistics').get,
      },
      Orders: {
        get: $resource('/api/mall/order/getAgentList').get,
      },
      Order: {
        get: $resource('/api/mall/order/getAgentDetail').save,
      },

      /* 资金
         ---------------------------------- */
      FundsInfo: {
        get: $resource('/api/mall/agent/getTransactionStatistics').get,
      },
      Funds: {
        get: $resource('/api/mall/agent/getTransactionList').get,
      },
      Fund: {
        get: $resource('/api/mall/agent/getTransactionDetail').save,
      },
      Wallet: {
        get: $resource('/api/mall/agent/getWallet').get
      },
      Refunds: {
        get: $resource('/api/mall/refund/getAgentList').get,
        batchSet: $resource('/api/mall/refund/getRefundBatch').save,//批量退款
      },
      Drawings: {
        get: $resource('/api/mall/withdrawal/getList').get,//提现列表(地产运营商)
      },
      Drawing: {
        finish: $resource('/api/mall/withdrawal/finish').save, //提现完成
      },

      /* 广告
         ---------------------------------- */
      Advertisement: {
        get: $resource('/api/custom/advertisement/getAds').get,
        set: $resource('/api/custom/advertisement/setAds').save
      },

      /* 数据字典
       ---------------------------------- */
      Dict: {
        get: $resource('/api/mall/dict/getDictList').save,
      },

      /* 七牛
         ---------------------------------- */
      QiniuUploadToken: {
        get: $resource('/api/custom/qiniu/getUploadToken').get
      },

      /* app配置
       ---------------------------------- */
      AppVersions: {
        get: $resource('/api/version/app/getVersionList').get,
      },
      AppPlatforms: {
        get: $resource('/api/version/app/getPlatformList').get,
      },
      AppTypes: {
        get: $resource('/api/version/app/getAppList').get,
      },
      AppVersion: {
        create: $resource('/api/version/app/createVersion').save,
        get: $resource('/api/version/app/getVersionDetail').save,
        set: $resource('/api/version/app/updateVersion').save,
        del: $resource('/api/version/app/deleteVersion').save,
      },

      /* 文件导出
       ---------------------------------- */
      FileExport: {
        get: $resource('/api/custom/excel/export').save,
      },

    };
    return service;

    ////////////////
  }
}());
