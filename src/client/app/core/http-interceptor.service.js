(function () {
'use strict';

  angular
    .module('app.core')
    .factory('httpInterceptor', httpInterceptor);

  /* @ngInject */
  function httpInterceptor($log, $rootScope) {

    var service = {
      'response': function(response) {

        //
        // 只拦截/api/xxx 的http 请求
        if (response.config && response.config.url && response.config.url.search('^/api') !== -1) {
          var data = response.data;
          if (data && data.ret !== 0) {
            //$log.warn('Warning: ' + data.code, data.desc);

            //
            // 遇到/api请求出错时，想要弹出框提示，原本是调用logger.warning(xxx);
            // 但是logger本身依赖于$http, 而$http依赖于httpInterceptor, httpIterceptor又依赖于logger的话就产生循环依赖；
            // 所以这里使用观察者模式，发出一个消息给外部去监听处理，这样不需要依赖logger。
            //
            $rootScope.$emit('httpInterceptor.response.error', data);
          }
        }

        return response;
      },

      'responseError': function(resError) {

        // logger.error('Something Wrong in Server!!!');
        $log.error('Something Wrong in Server!!!');

        return resError;
      },
    };
    return service;
  }
}());
