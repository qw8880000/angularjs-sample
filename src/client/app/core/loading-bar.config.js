(function () {
  'use strict';

  angular
    .module('app.core')
    .config(loadingBarConfig);

  /* @ngInject */
  function loadingBarConfig(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.latencyThreshold = 50;
    cfpLoadingBarProvider.spinnerTemplate = '<div id="loading-bar-spinner"><div class="spinner-icon spinner-icon--theme-1"></div></div>';
    cfpLoadingBarProvider.loadingBarTemplate = '<div id="loading-bar"><div class="bar bar--theme-1"><div class="peg peg--theme-1"></div></div></div>';
  }

}());
