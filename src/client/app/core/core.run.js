(function () {
  'use strict';

  angular
    .module('app.core')
    .run(applicationBoot);

  /* @ngInject */
  function applicationBoot(routeService,
                           httpExceptionService,
                           authenticationService,
                           qiniu,
                           appinfoService) {

    //
    // http异常处理
    httpExceptionService.init();

    //
    // 权限初始化
    authenticationService.init();

    //
    // 监听路由切换,进行访问权限鉴定
    routeService.init();

    //
    // 不需要登陆即可获得的信息
    appinfoService.fetchUiCconfig();

    //
    // 七牛初始化
    qiniu.init();

  }

}());
