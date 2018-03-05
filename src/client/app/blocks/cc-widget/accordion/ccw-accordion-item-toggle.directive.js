(function () {
'use strict';

  angular
    .module('ccwAccordion')
    .directive('ccwAccordionItemToggle', ccwAccordionItemToggle);

  /* @ngInject */
  function ccwAccordionItemToggle() {
    // Usage:
    //
    // Creates:
    //
    var directive = {
      require: '^ccwAccordionItem',
      link: link,
      restrict: 'A',
    };
    return directive;

    function link(scope, element, attrs, accordionItemCtrl) {
      element.on('click', function () {
        accordionItemCtrl.toggle();
      });
    }
  }
}());
