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

      scope.attachItemClass = attrs.attachItemClass || '';
      scope.toggleItemClass = attrs.toggleItemClass || '';
      scope.togglePanelClass = attrs.togglePanelClass || '';
      scope.isOpen = angular.isDefined(attrs.isOpen) ? scope.$eval(attrs.isOpen) : false;
      scope.isDisabled = angular.isDefined(attrs.isDisabled) ? scope.$eval(attrs.isDisabled) : false;

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
      if (scope.isOpen) {
        accordionCtrl.closeOthers(scope);
      }

      accordionCtrl.digest();     // force the watcher to run by calling $digest
    }

  }

}());
