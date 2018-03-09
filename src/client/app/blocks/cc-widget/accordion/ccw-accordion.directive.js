(function () {
  'use strict';

  angular
    .module('ccwAccordion')
    .directive('ccwAccordion', ccwAccordion);

  // The accordion directive simply sets up the directive controller
  /* @ngInject */
  function ccwAccordion() {
    var directive = {
      bindToController: false, 
      controller: Controller,
      restrict: 'A',
    };
    return directive;
  }

  /* @ngInject */
  function Controller($scope, $attrs) {
    // This array keeps track of the accordion items
    this.items = [];

    this.isCloseOthers = angular.isDefined($attrs.closeOthers) ? $scope.$eval($attrs.closeOthers) : true;

    // Ensure that all the items in this accordion are closed, unless close-others explicitly says not to
    this.closeOthers = function(openItem) {
      if (this.isCloseOthers) {
        angular.forEach(this.items, function(item) {
          if (item !== openItem) {
            item.isOpen = false;
          }
        });
      }
    };

    // This is called from the accordion-item directive to add itself to the accordion
    this.addItem = function(item) {
      var that = this;
      this.items.push(item);
    };

    // This is called from the accordion-item directive when to remove itself
    this.removeItem = function(item) {
      var index = this.items.indexOf(item);
      if (index !== -1) {
        this.items.splice(index, 1);
      }
    };

    // Force the itself and it's children to flesh
    this.digest = function () {
      $scope.$digest();     // force the watcher to run by calling $digest
    };
  }
}());
