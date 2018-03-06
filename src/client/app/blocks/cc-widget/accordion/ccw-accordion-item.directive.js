(function () {
  'use strict';

  angular
    .module('ccwAccordion')
    .directive('ccwAccordionItem', ccwAccordionItem);

  /* @ngInject */
  function ccwAccordionItem() {
    var directive = {
      require: '^ccwAccordion',   // Require ccwAccordion directive and inject its controller as the fourth argument to the linking function.
      link: link,
      restrict: 'A',
      scope: {
        openClass: '@',
        isOpen: '=?',
        isDisabled: '=?',
      }
    };
    return directive;

    function link(scope, element, attrs, accordionCtrl) {
      var toggleElement = element.find('[ccw-accordion-toggle]');;
      var panelElement = element.find('[ccw-accordion-panel]');

      scope.openClass = attrs.openClass || 'panel-open';
      scope.isOpen = attrs.isOpen || false;
      scope.isDisabled = attrs.isDisabled || false;

      if(scope.isDisabled) {
        return;
      }

      // set ccw-accordion-toggle click listener
      if(toggleElement != null && panelElement != null) {
        toggleElement.on('click', function () {
          _toggleOpen(scope, accordionCtrl);
        });
      }

      // set watcher to attr
      scope.$watch('isOpen', function (value) {
        panelElement.toggleClass(scope.openClass, !!value);
      })

      // add scope to ccw-accordion controller
      accordionCtrl.addItem(scope);

      // set listener to destroy
      scope.$on('$destroy', function(event) {
        accordionCtrl.removeItem(scope);
      });
    }

    function _toggleOpen(scope, accordionCtrl) {
      scope.isOpen = !scope.isOpen;
      if (scope.isOpen) {
        accordionCtrl.closeOthers(scope);
      }
    }

  }

}());
