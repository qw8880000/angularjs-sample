(function () {
'use strict';

  angular
    .module('app.core')
    .factory('accountService', accountService);

  /* @ngInject */
  function accountService(dataService) {
    var service = {
      userInfo: {
        // nick: '',
        // phone: '',
        // userType: '',
      },
      agentInfos: [],

      // function
      fetchUserInfo: fetchUserInfo,
      setAgentInfos: setAgentInfos,
      setUserInfo: setUserInfo,
      getRegionAgentId: getRegionAgentId,
      getCommunities: getCommunities,
      getAgentType: getAgentType,
      getAgent: getAgent,
    };
    return service;

    ////////////////

    function fetchUserInfo() {
      return dataService.UserInfo.get(function (response) {
        if(response.ret === 0) {
          service.userInfo = response.result;
        }
      });
    }

    function setAgentInfos(agentInfos) {
      service.agentInfos = agentInfos;
    }

    function setUserInfo(userInfo) {
      service.userInfo = userInfo;
    }

    function getRegionAgentId() {
      var agentInfos = service.agentInfos;
      if (angular.isArray(agentInfos) && agentInfos[0]) {
        return agentInfos[0].agentId;
      } else {
        return '';
      }
    }

    function getCommunities() {
      var agentInfos = service.agentInfos;
      if (angular.isArray(agentInfos) && agentInfos[0]) {
        return agentInfos[0].communities;
      } else {
        return [];
      }
    }

    function getAgentType() {
      var agentInfos = service.agentInfos;
      if (angular.isArray(agentInfos) && agentInfos[0]) {
        return agentInfos[0].type.id;
      } else {
        return null;
      }
    }

    function getAgent() {
      var agentInfos = service.agentInfos;
      if (angular.isArray(agentInfos) && agentInfos[0]) {
        return agentInfos[0];
      } else {
        return null;
      }
    }

  }
}());
