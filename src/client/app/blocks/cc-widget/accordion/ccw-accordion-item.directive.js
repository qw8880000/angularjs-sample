(function () {
  'use strict';

  angular
    .module('ccwAccordion')
    .directive('ccwAccordionItem', ccwAccordionItem);

  /* @ngInject */
  function ccwAccordionItem() {
    var directive = {
      require: '^ccwAccordion',   // Require ccwAccordion directive and inject its controller as the fourth argument to the linking function.
      bindToController: false, 
      controller: Controller,
      link: link,
      restrict: 'A',
      scope: {
      }
    };
    return directive;

    function link(scope, element, attrs, accordionCtrl) {
      accordionCtrl.addItem(scope);
    }
  }

  /* @ngInject */
  function Controller() {
    this.header = null;
    this.body = null;
  }
}());
