(function () {
  'use strict';

  angular
    .module('app.agents')
    .controller('AgentsEditController', AgentsEditController);

  /* @ngInject */
  function AgentsEditController(dataService,
                                dialogService,
                                logger,
                                $state,
                                communitySelectModal,
                                $stateParams) {

    var vm = this;
    vm.agentId = $stateParams.id;
    vm.agent = {
      phone: null,
      name: null,
      communities: []
    };
    vm.isEdit = isEdit;
    vm.submitForm = submitForm;
    vm.cancel = cancel;
    vm.communitySelect = communitySelect;
    vm.delectCommunity = delectCommunity;

    activate();

    ////////////////

    function activate() {
      if (isEdit()) {
        getAgent();
      }
    }

    function delectCommunity(community) {
      var communities = vm.agent.communities;
      var index = (angular.isArray(communities)) ? communities.indexOf(community) : -1;

      if (index >= 0) {
          communities.splice(index, 1);
      }
    }

    function communitySelect() {
      var params = {
        idle: true,
        getCityByRegionAgentId: false,
      };

      if (isEdit()) {
        params.regionAgentId = vm.agentId;
        params.currentCommunities = angular.copy(vm.agent.communities);
      }

      communitySelectModal.open(params).then(function (result) {
        vm.agent.communities = result.currentCommunities;
      });
    }

    //
    // Is edit or add
    //
    function isEdit() {
      return (vm.agentId !== null) ? true : false;
    }

    function getAgent() {
      return dataService.RegionAgent.get({
        'agentId': vm.agentId
      }, function (response) {
        if (response.ret === 0) {
          vm.agent.phone = response.result.userBase.phone;
          vm.agent.name = response.result.agentName;
          vm.agent.communities = response.result.communities || [];
        }
      });
    }

    function submitForm(form) {
      var action;
      var params = {};
      var communityIds = [];

      if (form.$invalid || vm.agent.communities.length <= 0) {
        logger.info('表单未填写完整');
        return;
      }

      angular.forEach(vm.agent.communities, function (community) {
        communityIds.push(community.id);
      });

      params.communityIds = communityIds;
      params.agentName = vm.agent.name;

      if (isEdit()) {
        action = dataService.RegionAgent.set;
        params.agentId = vm.agentId;

      } else {
        action = dataService.RegionAgent.create;
        params.phone = vm.agent.phone;
      }

      action(params, function (response) {
        if (response.ret === 0) {
          dialogService.alert('保存成功', function () {
            $state.go('home.agents.manage');
          });
        }
      });
    }

    function cancel() {
      $state.go('home.agents.manage');
    }

  }
}());
