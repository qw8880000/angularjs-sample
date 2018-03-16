(function () {
'use strict';

  angular
    .module('app.core')
    .factory('routeService', routeService);

  /* @ngInject */
  function routeService($transitions,
    $log,
    authenticationService) {

    var service = {
      onRouteSwitch: onRouteSwitch,
    };
    return service;

    ////////////////

    function onRouteSwitch() {
      // 监听路由切换,进行访问权限鉴定
      $transitions.onBefore({}, function (transition) {
        var stateService = transition.router.stateService;
        var data = transition.to().data || {};

        $log.info('route: ' + transition.from().name + ' -> ' + transition.to().name);

        if (data.public !== true && !authenticationService.isAuthenticated()) {
          $log.info('route redirect -> login');
          return stateService.target('login');
        }

      });
    }
  }
}());
