(function () {
'use strict';

  angular
    .module('ccwModal')
    .directive('ccwModalContent', ccwModalContent);

  /* @ngInject */
  function ccwModalContent() {
    // Usage:
    //
    // Creates:
    //
    var directive = {
      link: link,
      restrict: 'A',
    };
    return directive;

    function link(scope, element, attrs) {
      element.on('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
      });
    }
  }
}());
