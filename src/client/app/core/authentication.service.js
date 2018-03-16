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
    };
    return service;

    ////////////////

    function isAuthenticated() {
      return authenticated;
    }
  }
}());
