(function () {
'use strict';

  angular
    .module('app.core')
    .factory('routeService', routeService);

  /* @ngInject */
  function routeService($transitions,
    $log,
    $state,
    authenticationService) {

    var service = {
      init: init,
      logout: logout,
    };
    return service;

    ////////////////

    function init() {
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

    function logout(isTokenExpired) {
      $state.go('login', {isTokenExpired: !!isTokenExpired});
      authenticationService.logout();
    }
  }
}());
