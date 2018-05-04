(function () {
  'use strict';

  angular
    .module('app.core')
    .config(httpConfig);

  /* @ngInject */
  function httpConfig($httpProvider) {
    var headersCommon = $httpProvider.defaults.headers.common;

    //
    // Set http request headers
    // 1. appname 启动时必须默认为'agent_web'，否则登陆请求会失败，登陆后有可能发生变化
    //
    headersCommon.Accept = 'application/json, text/plain, */*; image/jpeg/png; version=1';
    headersCommon.appname = 'agent_web';  // 1

    //
    // https://docs.angularjs.org/api/ng/service/$http#interceptors
    //
    $httpProvider.interceptors.push('httpInterceptor');
  }

}());
