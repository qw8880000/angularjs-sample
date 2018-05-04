(function () {
'use strict';

  angular
    .module('app.home')
    .controller('HomeController', HomeController);

  /* @ngInject */
  function HomeController(routeService,
                          $state,
                          $scope,
                          accountService) {

    var vm = this;
    vm.title = 'homeController';
    vm.logout = logout;
    vm.userEdit = userEdit;
    vm.passwordEdit = passwordEdit;
    vm.user = {
      nick: accountService.userInfo.nick || '',
      avatarUrl: accountService.userInfo.headUrl || 'img/user.jpg',
    };

    activate();

    ////////////////

    function activate() {
      $scope.$on('updatedUserInfo', function (event, args) {
        vm.user.nick = args.nick;
        vm.user.avatarUrl = args.headUrl;
      });
    }

    function logout() {
      routeService.logout();
    }

    function userEdit() {
      $state.go('home.user-eidt');
    }

    function passwordEdit() {
      $state.go('home.password-edit');
    }

  }
}());
