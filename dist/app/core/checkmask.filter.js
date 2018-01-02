(function () {
  'use strict';

  angular
    .module('app.core')
    .filter('checkmask', checkmask);

  function checkmask() {
    return checkmaskFilter;

    //--------------------------------

    function checkmaskFilter(input) {
      return input ? '\u2713' : '\u2718';
    }
  }

}());

