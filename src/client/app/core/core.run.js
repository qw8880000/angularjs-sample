(function () {
  'use strict';

  angular
    .module('app.core')
    .run(applicationBoot);

  /* @ngInject */
  function applicationBoot(routeService) {
    routeService.onRouteSwitch();     // 监听路由切换,进行访问权限鉴定
  }

}());
