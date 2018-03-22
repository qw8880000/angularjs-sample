(function () {
'use strict';

  angular
    .module('app.core')
    .factory('httpInterceptor', httpInterceptor);

  /* @ngInject */
  function httpInterceptor($log) {

    var service = {
      'response': function(response) {

        $log.info(response);

        //
        // 只拦截/api/xxx 的http 请求
        // if (response.config && response.config.url && response.config.url.search('^/api') !== -1) {
          // var data = response.data;
          // if (data && data.ret !== 0) {
            // $log.warn('Warning: ' + data.code, data.desc);
          // }
        // }

        return response;
      },

      'responseError': function(resError) {

        $log.error('Something Wrong in Server!!!');

        return resError;
      },
    };
    return service;
  }
}());
