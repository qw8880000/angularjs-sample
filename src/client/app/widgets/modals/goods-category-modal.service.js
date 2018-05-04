(function () {
  'use strict';

  angular
    .module('app.widgets')
    .factory('goodsCategoryModal', goodsCategoryModal);

  /* @ngInject */
  function goodsCategoryModal(ccwModal) {
    var service = {
      add: add,
      edit: edit
    };
    return service;

    ////////////////

    function add(categories) {
      return goodsCategoryAction('add', categories);
    }

    function edit(categories, currentCategory, sort) {
      return goodsCategoryAction('edit', categories, currentCategory, sort);
    }

    function goodsCategoryAction(type, categories, currentCategory, sort) {

      var modalInstance = ccwModal.open({
        bodyClass: 'modal-open',
        templateUrl: 'app/widgets/modals/goods-category-modal.html',
        controller: goodsCategoryController,
        controllerAs: 'vm',
        resolve: {
          type: function () {
            return type;
          },
          categories: function () {
            return categories;
          },
          currentCategory: function () {
            return currentCategory;
          },
          sort: function () {
            return sort;
          },
        },
      });

      return modalInstance.result;
    }

    /* @ngInject */
    function goodsCategoryController($ccwModalInstance, type, categories, currentCategory, sort) {
      var vm = this;
      vm.ok = ok;
      vm.cancel = cancel;
      vm.close = cancel;
      vm.select = select;
      vm.categories = null;
      vm.currentCategory = null;
      vm.sort = sort || 0;
      vm.type = type || 'add';

      activate()

      //////////////////////////////////

      function activate() {

        if(categories && angular.isArray(categories)) {
          vm.categories = categories;
        } else {
          return;
        }

        if (currentCategory) {
          vm.currentCategory = currentCategory;
        } else {
          vm.currentCategory = categories[0];
        }
      }

      function select(category) {
        vm.currentCategory = category;
      }

      function ok() {
        $ccwModalInstance.close({
          category: vm.currentCategory,
          sort: vm.sort,
        });
      }

      function cancel() {
        $ccwModalInstance.dismiss('cancel');
      }

    }

  }
}());
