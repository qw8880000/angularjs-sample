(function () {
'use strict';

  angular
    .module('app.core')
    .factory('authenticationService', authenticationService);

  /* @ngInject */
  function authenticationService() {

    var authenticated = false;

    var service = {
      isAuthenticated: isAuthenticated,
      login: login,
    };
    return service;

    ////////////////

    function isAuthenticated() {
      return authenticated;
    }

    function login(username, password, success, fail) {
      if (username === 'test' && password === '123456') {
        authenticated = true;
        success();
      } else {
        fail();
      }
    }
  }
}());
