(function () {
'use strict';

  angular
    .module('app.core')
    .factory('appinfoService', appinfoService);

  /* @ngInject */
  function appinfoService(dataService) {
    var service = {
      uiConfig: {
        // copyright: '',
      },
      appInfo: {
        // goEasy: {},
        // qiniu: {},
      },

      // function
      fetchUiCconfig: fetchUiCconfig,
      fetchAppInfo: fetchAppInfo,
    };
    return service;

    ////////////////

    function fetchUiCconfig() {
      return dataService.UiConfig.get(function (response) {
        if(response.ret === 0) {
          service.uiConfig = response.result;
        }
      });
    }

    function fetchAppInfo() {
      return dataService.AppInfo.get(function (response) {
        if(response.ret === 0) {
          service.appInfo = response.result;
        }
      });
    }
  }
}());
