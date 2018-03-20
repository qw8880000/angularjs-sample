// Karma configuration
// Generated on 2018-02-12

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    // autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      'jasmine'
    ],

    // list of files / patterns to load in the browser
    files: [
      /*-- bower:js --*/
      'src/client/bower_components/jquery/dist/jquery.js',
      'src/client/bower_components/angular/angular.js',
      'src/client/bower_components/angular-animate/angular-animate.js',
      'src/client/bower_components/angular-ui-router/release/angular-ui-router.js',
      'src/client/bower_components/angular-resource/angular-resource.js',
      'src/client/bower_components/angular-toastr/dist/angular-toastr.tpls.js',
      'src/client/bower_components/angular-cookies/angular-cookies.js',
      'src/client/bower_components/angular-mocks/angular-mocks.js',
      /*-- endbower --*/
      
      /*-- angular.js --*/
      'src/client/app/animations/animations.module.js',
      'src/client/app/animations/animations.controller.js',
      'src/client/app/blocks/cc-widget/cc-widget.module.js',
      'src/client/app/blocks/cc-widget/accordion/ccw-accordion.module.js',
      'src/client/app/blocks/cc-widget/accordion/ccw-accordion.directive.js',
      'src/client/app/blocks/cc-widget/accordion/ccw-accordion-item.directive.js',
      'src/client/app/core/core.module.js',
      'src/client/app/core/checkmask.filter.js',
      'src/client/app/core/data.service.js',
      'src/client/app/core/route.config.js',
      'src/client/app/core/toastr.config.js',
      'src/client/app/custom-filters/custom-filters.module.js',
      'src/client/app/custom-filters/custom-filters.controller.js',
      'src/client/app/dashboard/dashboard.module.js',
      'src/client/app/dashboard/dashboard.controller.js',
      'src/client/app/layout/layout.module.js',
      'src/client/app/repeaters/repeaters.module.js',
      'src/client/app/repeaters/repeaters.controller.js',
      'src/client/app/toastrs/toastrs.module.js',
      'src/client/app/toastrs/toastrs.controller.js',
      'src/client/app/app.module.js',

      /*-- injector:test:js --*/
      'test/unit/app.module.spec.js',
      'test/unit/blocks/cc-widget/ccw-accordion-item.spec.js',
      'test/unit/blocks/cc-widget/ccw-accordion.spec.js',
      /*-- endinjector --*/
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    // port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'Chrome'
    ],

    // Which plugins to enable
    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
