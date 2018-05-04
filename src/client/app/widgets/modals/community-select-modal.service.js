(function () {
  'use strict';

  angular
    .module('app.widgets')
    .factory('communitySelectModal', communitySelectModal);

  /* @ngInject */
  function communitySelectModal(ccwModal) {
    var service = {
      open: open
    };
    return service;

    ////////////////

    function open(params) {
      var modalInstance = ccwModal.open({
        bodyClass: 'modal-open',
        templateUrl: 'app/widgets/modals/community-select-modal.html',
        controller: communitySelectController,
        controllerAs: 'vm',
        resolve: {
          params: function () {
            return params;
          }
        },
      });

      return modalInstance.result;
    }

    //
    //
    // controller
    //
    //

    /* @ngInject */
    function communitySelectController($ccwModalInstance,
                                       dataService,
                                       params) {
      var vm = this;
      vm.ok = ok;
      vm.cancel = cancel;
      vm.close = cancel;
      vm.cities = [];
      vm.communities = [];
      vm.currentCity = null;
      vm.cityChanged = cityChanged;
      vm.communitySelected = communitySelected;

      var regionAgentId = params.regionAgentId;
      var idle = params.idle || false;
      var getCityByRegionAgentId = params.getCityByRegionAgentId || false;
      vm.currentCommunities = angular.isArray(params.currentCommunities) ? params.currentCommunities : [];

      activate()

      //////////////////////////////////

      function activate() {
        getCities();
      }
      
      function getCities() {
        var params = {};

        if (getCityByRegionAgentId) {
          if (regionAgentId) {
            params.regionAgentId = regionAgentId;
          }
        }

        dataService.Cities.get(params, function (response) {
          if (response.ret === 0) {
            vm.cities = response.result;
          }
        });
      }

      function getCommunities(currentCity) {
        var params = {
          'cityName': currentCity,
        };
        if (regionAgentId) {
          params.regionAgentId = regionAgentId;
        }
        params.idle = (idle) ? true : false;

        dataService.Communities.get(params, function (response) {
          if (response.ret === 0) {
            vm.communities = response.result;
            angular.forEach(vm.communities, function (community) {
              community.selected = isInCurrentCommunity(community) ? true : false;
            })
          }
        });
      }

      function cityChanged() {
        getCommunities(vm.currentCity);
      }

      function indexOf(communities, community) {
        var i = 0;

        if (!angular.isArray(communities)) {
          return -1;
        }

        for (i = 0; i < communities.length; i++) {
          if (communities[i].id == community.id) {
            return i;
            break;
          }
        }

        return -1;
      }

      function communitySelected(community) {
        if (community.selected) {
          vm.currentCommunities.push(community);
        } else {
          var index = indexOf(vm.currentCommunities, community);
          vm.currentCommunities.splice(index, 1);
        }
      }

      function isInCurrentCommunity(community) {
        for (var i = 0; i < vm.currentCommunities.length; i++) {
          if (vm.currentCommunities[i].id === community.id) {
            return true;
          }
        }

        return false;
      }

      function ok() {
        $ccwModalInstance.close({
          currentCommunities: vm.currentCommunities,
        });
      }

      function cancel() {
        $ccwModalInstance.dismiss('cancel');
      }

    }

  }
}());
