(function () {
  'use strict';

  angular
    .module('app.core')
    .config(httpConfig);

  /* @ngInject */
  function httpConfig($httpProvider) {
    var headersCommon = $httpProvider.defaults.headers.common;

    //
    // set http request headers
    //
    headersCommon.appname = 'agent_web';
    headersCommon.Accept = 'application/json, text/plain, */*; image/jpeg/png; version=1';

    //
    // https://docs.angularjs.org/api/ng/service/$http#interceptors
    //
    $httpProvider.interceptors.push('httpInterceptor');
  }

}());
