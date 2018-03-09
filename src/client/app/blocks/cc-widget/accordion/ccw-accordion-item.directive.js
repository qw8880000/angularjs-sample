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
        toggleItemClass: '@',
        togglePanelClass: '@',
        isOpen: '=?',
        isDisabled: '=?',
      }
    };
    return directive;

    function link(scope, element, attrs, accordionCtrl) {
      var toggleElements = element.find('[ccw-accordion-toggle]');;
      var panelElements = element.find('[ccw-accordion-panel]');

      scope.toggleItemClass = attrs.toggleItemClass || 'item-open';
      scope.togglePanelClass = attrs.togglePanelClass || 'panel-open';
      scope.isOpen = attrs.isOpen || false;
      scope.isDisabled = attrs.isDisabled || false;

      if(scope.isDisabled) {
        return;
      }

      // set ccw-accordion-toggle click listener
      if(toggleElements.length > 0) {
        toggleElements.on('click', function () {
          _toggleOpen(scope, accordionCtrl);
        });
      }

      // set watcher to attr
      scope.$watch('isOpen', function (value) {

        element.toggleClass(scope.toggleItemClass, !!value);

        if(panelElements.length > 0) {
          panelElements.toggleClass(scope.togglePanelClass, !!value);
        }
      });

      // add scope to ccw-accordion controller
      accordionCtrl.addItem(scope);

      // set listener to destroy
      scope.$on('$destroy', function(event) {
        accordionCtrl.removeItem(scope);
      });
    }

    function _toggleOpen(scope, accordionCtrl) {
      scope.isOpen = !scope.isOpen;
      element.addClass(scope.toggleItemClass);
      if (scope.isOpen) {
        accordionCtrl.closeOthers(scope);
      }
      accordionCtrl.digest();     // force the watcher to run by calling $digest
    }

  }

}());
