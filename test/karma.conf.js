// Karma configuration
// Generated on 2018-02-12

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    // autoWatch: true,

    // base path, that will be used to resolve files and exclude
    // basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      'jasmine'
    ],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'src/client/bower_components/angular/angular.js',
      'src/client/bower_components/angular-ui-router/release/angular-ui-router.js',
      'src/client/bower_components/angular-resource/angular-resource.js',
      'src/client/bower_components/angular-animate/angular-animate.js',
      'src/client/bower_components/angular-toastr/dist/angular-toastr.tpls.js',
      'src/client/bower_components/angularjs-imageupload-directive/public/javascripts/imageupload.js',
      'src/client/bower_components/angular-mocks/angular-mocks.js',
      // endbower
      
      /*-- injector:angular --*/
      'src/client/app/animations/animations.component.js',
      'src/client/app/animations/animations.module.js',
      'src/client/app/app.module.js',
      'src/client/app/core/checkmask.filter.js',
      'src/client/app/core/core.module.js',
      'src/client/app/core/data.service.js',
      'src/client/app/core/route.config.js',
      'src/client/app/core/toastr.config.js',
      'src/client/app/custom-filters/custom-filters.component.js',
      'src/client/app/custom-filters/custom-filters.module.js',
      'src/client/app/file-upload/file-upload.component.js',
      'src/client/app/file-upload/file-upload.module.js',
      'src/client/app/home/home.component.js',
      'src/client/app/home/home.module.js',
      'src/client/app/layout/layout.module.js',
      'src/client/app/repeaters/repeaters.component.js',
      'src/client/app/repeaters/repeaters.module.js',
      'src/client/app/toastrs/toastrs.component.js',
      'src/client/app/toastrs/toastrs.module.js',
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
    // singleRun: false,

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
