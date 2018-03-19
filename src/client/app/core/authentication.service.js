(function () {
'use strict';

  angular
    .module('app.core')
    .factory('authenticationService', authenticationService);

  /* @ngInject */
  function authenticationService($cookies,
    $timeout) {

    var service = {
      isAuthenticated: isAuthenticated,
      login: login,
      logout: logout,
    };
    return service;

    ////////////////

    function isAuthenticated() {
      if ($cookies.get('isAuthenticated') === 'true') {
        return true;
      } else {
        return false;
      }
    }

    function login(username, password, callback) {
      /* Dummy authentication for testing, uses $timeout to simulate api call
         ----------------------------------------------*/
      $timeout(function(){
        var response = { success: username === 'test' && password === '123456' };
        var date = new Date();

        if(!response.success) {
          response.message = 'Username or password is incorrect';
          $cookies.remove('isAuthenticated');
        } else {
          $cookies.put('isAuthenticated', 'true');
        }

        callback(response);

      }, 1000);

      /* Use this for real authentication
         ----------------------------------------------*/
      //$http.post('/api/authenticate', { username: username, password: password })
      //    .success(function (response) {
      //        callback(response);
      //    });
    }

    function logout() {
      $cookies.remove('isAuthenticated');
    }
  }
}());
