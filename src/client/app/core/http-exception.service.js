(function () {
'use strict';

  angular
    .module('app.core')
    .factory('httpExceptionService', httpExceptionService);

  /* @ngInject */
  function httpExceptionService(logger,
                                routeService,
                                $rootScope) {

    var service = {
      init: init
    };
    return service;

    ////////////////

    function init() {
      var handle = $rootScope.$on('httpInterceptor.response.error', function (event, data) {
        if (data) {
          var code = data.code;
          var desc = data.desc;

          if (code === 'WS_PRIVATE_0004'
            || code === 'WS_PRIVATE_0005'
            || code === 'WS_PRIVATE_0006') {  // 认证过期
            routeService.logout(true);
          } else {
            logger.warning(desc);
          }
        }
      });
    }
  }
}());
