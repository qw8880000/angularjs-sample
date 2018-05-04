(function () {
'use strict';

  angular
    .module('app.core')
    .factory('dictionary', dictionary)
    .constant('DICTIONARY', {
      DELIVERYMETHOD: 1000,     // deliveryMethod: 订单配送方式[到店消费/送货上门]
      GOODSTATE: 1001,          // goodState: 商品状态[未发布/审核中/审核未通过/销售中/已下架/已禁售]
      GOODRECOMMENDSTATE: 1003, // goodRecommendState: 商品推荐状态[未推荐/推荐等级1/推荐等级2]
      ORDERPAYCHANNEL: 1004,    // orderPayChannel: 订单支付方式[线下支付/在线支付]
      ORDERSTATE: 1005,         // orderState: 订单状态[已取消/未付款/已付款/已发货/已收货]
      ORDERFROM: 1006,          // orderFrom: 订单来源[网页端/移动端]
      ORDEREVALUATESTATE: 1007, // orderEvaluateState: 订单评价状态[未评价/已评价/已过期未评价]
      STORESTATE: 1008,         // storeState: 店铺状态[未营业/营业]
      ORDERPAYSTATE: 1009,      // orderPayState: 订单支付状态[已申请/已完成]
      ORDERPAYTYPE: 1010,       // orderPayType: 订单支付类型[订单支付/钱包充值]
      ORDERPAYMETHOD: 1011,     // orderPayMethod: 订单支付方式[支付宝/微信/银行卡]
      TRANSACTIONTYPE: 1012,    // transactionType: 交易流水类型[交易收入/用户提现/用户充值至钱包/钱包消费/系统退款/用户不通过钱包的直接消费]
      WITHDRAWALSTATE: 1013,    // withdrawalState: 钱包提现状态[已申请/已完成]
      REFUNDREASON: 1014,       // refundReason: 退款原因[假冒品牌/质量问题/其他……]
      REFUNDREJECTREASON: 1015, // refundRejectReason: 拒绝退款原因[商品没问题/商品影响二次销售/其他……]
      REFUNDSTATE: 1016,        // refundState: 退款状态[申请款等待卖家确认/商家不同意退款等待业主修改/商家同意退款等待业主退货/退款中/退款关闭/退款成功/退款失败
      DICTNONE: 9999
    });

  /* @ngInject */
  function dictionary(dataService, $q) {
    var dict = [];
    var service = {
      get: get
    };
    return service;

    ////////////////
    
    /**
     * @Brief 从数据字典里查询key 对应的 value
     *
     * @Param key
     *
     * @Returns promise (resolve 的参数是 value)
     */
    function get(key) {
      var deferred = $q.defer();

      if (angular.isDefined(dict[key])) {
        deferred.resolve(dict[key]);
      } else {
        getFromServer(key).$promise.then(function (response) {
          if (response.ret === 0) {
            deferred.resolve(response.result);
          } else {
            deferred.reject();
          }
        }, function () {
          deferred.reject();
        });
      }

      return deferred.promise;
    }

    function getFromServer(key) {
      return dataService.Dict.get({
        dictId: key,
      }, function (response) {
        if (response.ret === 0) {
          dict[key] = response.result;        // cache the value
        }
      });
    }
  }
}());
