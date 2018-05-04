(function () {
  'use strict';

  angular
    .module('app.agents')
    .controller('AgentsManageController', AgentsManageController);

  /* @ngInject */
  function AgentsManageController(dataService,
                                      $state,
                                      dialogService,
                                      PAGINATION) {

    var vm = this;
    vm.regionAgents = [];
    vm.search = {
      agentName: null,
    };
    vm.searchAction = searchAction;
    vm.refresh = refresh;
    vm.currentPage = 1;
    vm.totalItems = 0;
    vm.itemsPerPage = PAGINATION.ITEMSPERPAGE;

    vm.add = add;
    vm.edit = edit;
    vm.del = del;

    activate();

    ////////////////

    function activate() {
      getData(getParams());
    }

    function refresh() {
      getData(getParams());
    }

    function searchAction() {
      vm.currentPage = 1;     // 只要一点击搜索，统一回到第1页
      getData(getParams());
    }

    function getParams() {
      var params = {};

      //
      // 搜索参数
      //
      if (vm.search.agentName !== null) {
        params.agentName = vm.search.agentName;
      }

      //
      // 必备参数
      //
      params.page = vm.currentPage - 1;
      params.size = vm.itemsPerPage;

      return params;
    }

    function getData(params) {
      dataService.RegionAgents.get(params, function (response) {
        if (response.ret === 0) {
          vm.regionAgents = response.result.data;
          vm.totalItems = response.result.page.totalElements;
        }
      });
    }

    function add() {
      $state.go('home.agents.edit');
    }

    function edit(regionAgent) {
      $state.go('home.agents.edit', {id: regionAgent.agentId});
    }

    function del(regionAgent) {
      var message = '确认删除区域运营商 ' + regionAgent.agentName + ' ?';
      dialogService.confirm(message, function () {
        dataService.RegionAgent.del({
          'agentId': regionAgent.agentId
        }, function (response) {
          if (response.ret === 0) {
            refresh();
          }
        });
      });
    }

  }
}());
