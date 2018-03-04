(function () {
  'use strict';

  angular
    .module('ccwAccordion')
    .directive('ccwAccordionItem', ccwAccordionItem);

  /* @ngInject */
  function ccwAccordionItem() {
    var directive = {
      controller: Controller,
      controllerAs: 'vm',
      link: link,
      restrict: 'A',
      scope: {
      }
    };
    return directive;

    function link(scope, element, attrs) {
    }
  }

  /* @ngInject */
  function Controller() {

  }
}());
