(function () {
'use strict';

  angular
    .module('app.appVersion')
    .controller('AppVersionManageController', AppVersionManageController);

  /* @ngInject */
  function AppVersionManageController(dataService,
                                      $state,
                                      dialogService,
                                      PAGINATION) {

    var vm = this;
    vm.title = 'AppVersionManageController';
    vm.appVersions = [];
    vm.search = {
      platform: null,      // 手机系统
      appType: null,      // 应用类型
    };
    vm.searchAction = searchAction;
    vm.refresh = refresh;
    vm.currentPage = 1;
    vm.totalItems = 0;
    vm.itemsPerPage = PAGINATION.ITEMSPERPAGE;

    vm.isForceUpdate = isForceUpdate;
    vm.add = add;
    vm.edit = edit;
    vm.del = del;
    vm.view = view;

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
      if (vm.search.platform !== null) {
        params.platformId = vm.search.platform.id;
      }

      if (vm.search.appType !== null) {
        params.appId = vm.search.appType.id;
      }

      //
      // 必备参数
      //
      params.page = vm.currentPage - 1;
      params.size = vm.itemsPerPage;

      return params;
    }

    function getData(params) {
      dataService.AppVersions.get(params, function (response) {
        if (response.ret === 0) {
          vm.appVersions = response.result.data;
          vm.totalItems = response.result.page.totalElements;
        }
      });
    }

    function isForceUpdate(isForceUpdate) {
      return isForceUpdate == 0 || isForceUpdate == false ? '否' : '是';
    }

    function add() {
      $state.go('home.settings.app-version-edit');
    }

    function edit(appVersion) {
      $state.go('home.settings.app-version-edit', {id: appVersion.id});
    }

    function del(appVersion) {
      var message = '确认删除app版本 ' + appVersion.versionName + ' ?';
      dialogService.confirm(message, function () {
        dataService.AppVersion.del({
          'id': appVersion.id
        }, function (response) {
          if (response.ret === 0) {
            refresh();
          }
        });
      });
    }

    function view(appVersion) {
      $state.go('home.settings.app-version-view', {id: appVersion.id});
    }

  }
}());
