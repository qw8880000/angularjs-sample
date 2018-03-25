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
        isOpen: '=?',
        isDisabled: '=?',
        isFocus: '=?',
        itemFocusClass: '@?',
        itemOpenClass: '@?',
        panelOpenClass: '@?',
      },
    };
    return directive;

    function link(scope, element, attrs, accordionCtrl) {
      var toggleElements = element.find('[ccw-accordion-toggle]');
      var panelElements = element.find('[ccw-accordion-panel]');

      scope.itemFocusClass = scope.itemFocusClass || '';
      scope.itemOpenClass = scope.itemOpenClass || '';
      scope.panelOpenClass = scope.panelOpenClass || '';
      scope.isOpen = !!scope.isOpen;
      scope.isDisabled = !!scope.isDisabled;
      scope.isFocus = !!scope.isFocus;

      // add scope to ccw-accordion controller
      accordionCtrl.addItem(scope);

      // set ccw-accordion-toggle click listener
      if(toggleElements.length > 0) {
        toggleElements.on('click', function () {
          _toggleOpen(scope, accordionCtrl);
        });
      }

      // set watcher to attr
      scope.$watch('isOpen', function (newValue, oldValue) {

        // toggle class
        element.toggleClass(scope.itemOpenClass, newValue);

        if(panelElements.length > 0) {
          panelElements.toggleClass(scope.panelOpenClass, newValue);
        }
      });

      scope.$watch('isFocus', function (newValue, oldValue) {
        element.toggleClass(scope.itemFocusClass, newValue);
      });

      // set listener to destroy
      scope.$on('$destroy', function(event) {
        accordionCtrl.removeItem(scope);
      });
    }

    function _toggleOpen(scope, accordionCtrl) {
      if (scope.isDisabled) {
        return;
      }

      // set open
      scope.isOpen = !scope.isOpen;
      if (scope.isOpen) {
        accordionCtrl.closeOthers(scope);
      }

      // set focus
      accordionCtrl.setFocus(scope);

      accordionCtrl.digest();     // force the watcher to run by calling $digest
    }

  }

}());
