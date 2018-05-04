(function () {
'use strict';

  angular
    .module('app.goods')
    .controller('GoodsViewController', GoodsViewController);

  /* @ngInject */
  function GoodsViewController($stateParams,
                               dataService,
                               GOODSSTATE) {

    var vm = this;
    vm.id = $stateParams.id;
    vm.good = $stateParams.good;
    vm.GOODSSTATE = GOODSSTATE;
    vm.goodDescription = '';

    activate();

    ////////////////

    function activate() {
      if (vm.good === null) {
        _getGood().$promise.then(function () {
          _getGoodDescription();
        });
      } else {
        _getGoodDescription();
      }
    }

    function _getGood() {
      return dataService.Good.get({
        'goodsId': vm.id,
      }, function (response) {
        if (response.ret === 0) {
          vm.good = response.result;
        }
      });
    }

    function _getGoodDescription() {
      dataService.GoodDescription.get({
        'srcUrl': vm.good.goodsBody
      }, function (response) {
        angular.forEach(response, function (value, key) {
          if (key != '$promise' && key != '$resolved') {
            vm.goodDescription += value;
          }
        });
      });
    }
  }
}());
