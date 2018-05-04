(function () {

'use strict';

  angular
    .module('app.core')
    .constant('SESSIONSTORAGE', {   //---------- sessionStorate
      AUTHENTICATED: 'authenticated',
      TOKEN: 'token',
      AGENTINFOS: 'agentInfos',
      USERINFO: 'userInfo',
    })
    .constant('PAGINATION', { //---------- pagination
      ITEMSPERPAGE: 20,         // itemsPerPage
    })
    .constant('SHOPSTATE', {  //---------- shopState
      OPEN: 1,                  // open
      CLOSE: 0,                 // close
    })
    .constant('GOODSSTATE', {  //---------- goodsState
      UNPUBLISHED: '0',                  // unpublished 未发布/待发布
      CHECKING: '1',                 // checking 审核中
      REJECTED: '2',                  // rejected 审核未通过
      SELLING: '3',                 // selling 销售中
      PULLEDOFF: '4',             // pulled off 已下架
      FORBIDDEN: '5',             // forbidden 已禁售
    })
    .constant('GOODSRECOMMENDSTATE', {  //---------- goodsRecommendState
      RECOMMENDED: '1',          // recommended 已推荐
      UNRECOMMENDED: '0',        // unrecommended 未推荐
    })
    .constant('ADSTYPE', {    //---------- adsType
      LIFE: {
        id: 1,
        name: '生活页广告',
        image: {
          width: 750,
          height: 460,
        },
      },              // life 生活页广告
      GOODS: {
        id: 3,
        name: '商品广告',
        image: {
          width: 750,
          height: 460,
        },
      },             // goods 商品广告
      STARTUP: {
        id: 2,
        name: '启动页广告',
        image: {
          width: 1128,
          height: 1636,
        },
      },           // startup 启动页广告
    })
    .constant('AGENTTYPE', {      //---------- agentType 运营商类型
      REGIONAGENT: 1,       // 区域运营商
      ESTATEAGENT: 2,      // 地产运营商
    })
    .constant('REFUNDSTATE', {
      REFUNDING: 3,       // 退款中
      REFUNDSUCCESS: 5,   // 退款成功
    })
    .constant('DRAWINGSTATE', {
      DRAWINGSTART: 0,         // 已申请
      DRAWINGFINISHED: 1,     // 已完成
    });

}());
