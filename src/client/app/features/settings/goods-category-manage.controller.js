(function () {
  'use strict';

  angular
    .module('app.settings')
    .controller('GoodsCategoryManageController', GoodsCategoryManageController);

  /* @ngInject */
  function GoodsCategoryManageController(dataService,
                                         dialogService,
                                         goodsCategoryModal,
                                         accountService) {

    var vm = this;
    vm.communities = null;
    vm.currentCommunity = null;
    vm.categoriesShowed = null;     // 显示在app首页的
    vm.navChanged = navChanged;
    vm.deleteCategory = deleteCategory;
    vm.addCategory = addCategory;
    vm.editCategory = editCategory;

    var categories = null;

    activate();

    ////////////////

    function activate() {
      vm.communities = accountService.getCommunities();

      // if no community, do nothing
      if (vm.communities.length === 0) {
        return;
      }

      vm.currentCommunity = vm.communities[0];
      getCategoriesShowed();
      getCategories();
    }

    function navChanged() {
      getCategoriesShowed();
    }

    function refresh() {
      getCategoriesShowed();
    }

    function getCategoriesShowed() {
      dataService.GoodsCategoriesShowed.get({
        'communityId': vm.currentCommunity.id,
      }, function (response) {
        if (response.ret === 0) {
          vm.categoriesShowed = response.result;
        }
      });
    }

    function getCategories() {
      dataService.GoodsCategories.get({
        'communityId': vm.currentCommunity.id,
      }, function (response) {
        if (response.ret === 0) {
          categories = response.result;
        }
      });
    }

    function deleteCategory(category, $event) {
      $event.stopPropagation();
      var message = '确认删除 ' + category.goodsClass.name + ' 分类?';
      dialogService.confirm(message, function () {
        dataService.GoodsCategoriesShowed.del({
          'id': category.id,
        }, function () {
          getCategoriesShowed();
        });
      });
    }

    function editCategory(categoryShowed) {
      goodsCategoryModal.edit(categories, categoryShowed.goodsClass, categoryShowed.sort).then(function (result) {
        dataService.GoodsCategoriesShowed.set({
          'id':categoryShowed.id,
          "communityId":  vm.currentCommunity.id,
          "goodsClassId": result.category.id,
          "sort": result.sort
        }, function (response) {
          if (response.ret === 0) {
            refresh();
          }
        });
      }, function () {
        // 消除 Possibly unhandled rejection: undefined
      });
    }

    function addCategory() {
      goodsCategoryModal.add(categories).then(function (result) {
        dataService.GoodsCategoriesShowed.create({
          "communityId": vm.currentCommunity.id,
          "goodsClassId": result.category.id,
          "sort": result.sort
        }, function (response) {
          if (response.ret === 0) {
            refresh();
          }
        });

      }, function () {
        // 消除 Possibly unhandled rejection: undefined
      });
    }

  }
}());
