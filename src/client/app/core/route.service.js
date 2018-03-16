(function () {
'use strict';

  angular
    .module('app.core')
    .factory('routeService', routeService);

  /* @ngInject */
  function routeService($transitions, authenticationService) {
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

        if (data.public !== true && !authenticationService.isAuthenticated()) {
          return stateService.target('login');
        }

      });
    }
  }
}());
