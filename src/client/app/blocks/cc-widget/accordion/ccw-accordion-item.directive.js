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
      scope: {},
    };
    return directive;

    function link(scope, element, attrs, accordionCtrl) {
      var toggleElements = element.find('[ccw-accordion-toggle]');
      var panelElements = element.find('[ccw-accordion-panel]');

      scope.itemFocusClass = attrs.itemFocusClass || '';
      scope.itemOpenClass = attrs.itemOpenClass || '';
      scope.panelOpenClass = attrs.panelOpenClass || '';
      scope.isOpen = angular.isDefined(attrs.isOpen) ? scope.$eval(attrs.isOpen) : false;
      scope.isDisabled = angular.isDefined(attrs.isDisabled) ? scope.$eval(attrs.isDisabled) : false;
      scope.isFocus = angular.isDefined(attrs.isFocus) ? scope.$eval(attrs.isFocus) : false;

      if(scope.isDisabled) {
        return;
      }

      // set ccw-accordion-toggle click listener
      if(toggleElements.length > 0) {
        toggleElements.on('click', function () {
          _toggleOpen(scope, accordionCtrl);
        });
      }

      if(scope.isFocus) {
        accordionCtrl.setFocus(scope);
      }

      // set watcher to attr
      scope.$watch('isOpen', function (value) {
        // toggle class
        element.toggleClass(scope.itemOpenClass, !!value);

        if(panelElements.length > 0) {
          panelElements.toggleClass(scope.panelOpenClass, !!value);
        }
      });

      scope.$watch('isFocus', function (value) {
        if(value) {
          element.addClass(scope.itemFocusClass);
        } else {
          element.removeClass(scope.itemFocusClass);
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
