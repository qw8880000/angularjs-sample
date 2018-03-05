(function () {
'use strict';

  angular
    .module('ccwAccordion')
    .directive('ccwAccordionItemBody', ccwAccordionItemBody);

  /* @ngInject */
  function ccwAccordionItemBody() {
    // Usage:
    //
    // Creates:
    //
    var directive = {
      bindToController: true,
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
