(function () {
'use strict';

  angular
    .module('ccwFileInput')
    .directive('ccwFileInput', ccwFileInput);

  /* @ngInject */
  function ccwFileInput() {
    // Usage: This directive enables <input type=file> to automatically work with the ng-change and ng-form directives
    //
    // Creates:
    //
    var directive = {
      restrict: 'A', // only activate on element attribute
      require: '?ngModel', // get a hold of NgModelController
      link: link,
    };
    return directive;

    function link(scope, element, attrs, ngModel) {
      if (!ngModel) return; // do nothing if no ng-model

      element.on("change", function(event) {
        var files = event.target.files;
        ngModel.$setViewValue(files);
      });

      element.on('$destroy', function() {
        element.off();
      });
    }
  }
}());
