(function () {
'use strict';

  angular
    .module('app.core')
    .factory('authenticationService', authenticationService);

  /* @ngInject */
  function authenticationService($http,
    $sessionStorage,
    $q,
    AGENTTYPE,
    SESSIONSTORAGE,
    md5,
    appinfoService,
    accountService,
    dataService) {

    var g_authenticated = false;

    var service = {
      init: init,
      isAuthenticated: isAuthenticated,
      login: login,
      logout: logout,
    };
    return service;

    ////////////////

    function _appPrepare(token, agentInfos, userInfo) {
      //
      // set authenticated
      //
      g_authenticated = true;

      //
      // save to accountService
      //
      accountService.setUserInfo(userInfo);
      accountService.setAgentInfos(agentInfos);

      //
      // 1. set token to http header
      // 2. set appname
      //
      $http.defaults.headers.common.authorization = 'Bearer ' + token;
      $http.defaults.headers.common.appname = accountService.getAgentType() === AGENTTYPE.ESTATEAGENT ? 'agent_vendor_web' : 'agent_web';

      //
      // get information from server
      //
      return $q.all([
        appinfoService.fetchAppInfo().$promise,
        //accountService.fetchUserInfo().$promise,
      ]);
    }

    function init() {
      if ($sessionStorage.get(SESSIONSTORAGE.AUTHENTICATED) === 'true') {
        var token = $sessionStorage.get(SESSIONSTORAGE.TOKEN);
        var agentInfos = $sessionStorage.get(SESSIONSTORAGE.AGENTINFOS);
        var userInfo = $sessionStorage.get(SESSIONSTORAGE.USERINFO);

        _appPrepare(token, agentInfos, userInfo);
      }
    }

    /**
     * @Brief 判断当前是否已经登陆
     */
    function isAuthenticated() {
      return g_authenticated;
    }

    function login(username, password, successCallback) {
      dataService.Account.login({
        'phone': username,
        'password': md5.generate16(password),
      }, function (response) {
        if (response.ret === 0) { // login success
          var token = response.result.token;
          var agentInfos = response.result.agentInfos;
          var userInfo = response.result.userInfo;

          //
          // store information to sessionstorage
          //
          $sessionStorage.put(SESSIONSTORAGE.AUTHENTICATED, 'true');
          $sessionStorage.put(SESSIONSTORAGE.TOKEN, token);
          $sessionStorage.put(SESSIONSTORAGE.AGENTINFOS, agentInfos);
          $sessionStorage.put(SESSIONSTORAGE.USERINFO, userInfo);

          //
          // save something to storage and get information form server
          //
          _appPrepare(token, agentInfos, userInfo).then(function () {
            if (angular.isFunction(successCallback)) {
              successCallback(response);
            }
          });
        }
      });
    }

    function logout() {
      g_authenticated = false;

      $sessionStorage.empty();
    }
  }
}());
