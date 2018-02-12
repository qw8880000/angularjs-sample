
'use strict';

module.exports = {

  karma: {

    options: {

      // enable or disable watching file and executing tests whenever any file changes
      //autoWatch: true,
      
      // base path, that will be used to resolve files and exclude
      //basePath: '../',

      // testing framework to use (jasmine/mocha/qunit/...)
      // as well as any additional frameworks (requirejs/chai/sinon/...)
      frameworks: ['jasmine'],

      // list of files / patterns to load in the browser
      files: [],

      // list of files / patterns to exclude
      exclude: [], 

      // web server port
      //port: 8080,

      // Start these browsers, currently available:
      // - Chrome
      // - ChromeCanary
      // - Firefox
      // - Opera
      // - Safari (only Mac)
      // - PhantomJS
      // - IE (only Windows)
      browsers: ['Chrome'],

      // Which plugins to enable
      plugins: [
        'karma-chrome-launcher',
        'karma-jasmine'
      ],

      // Continuous Integration mode
      // if true, it capture browsers, run tests and exit
      singleRun: false,

      colors: true,

      // level of logging
      // OFF, ERROR, WARN, INFO, DEBUG
      logLevel: 'INFO',

      // Uncomment the following lines if you are using grunt's server to run the tests
      // proxies: {
      //   '/': 'http://localhost:9000/'
      // },
      // URL root prevent conflicts with the site root
      // urlRoot: '_karma_'
    },

    dev: {
      files: [
        {
          src: [
            // bower:js
            'src/client/bower_components/angular/angular.js',
            'src/client/bower_components/angular-ui-router/release/angular-ui-router.js',
            'src/client/bower_components/angular-resource/angular-resource.js',
            'src/client/bower_components/angular-animate/angular-animate.js',
            'src/client/bower_components/angular-toastr/dist/angular-toastr.tpls.js',
            'src/client/bower_components/angularjs-imageupload-directive/public/javascripts/imageupload.js',
            'src/client/bower_components/angular-mocks/angular-mocks.js',
            // endbower
            
            '<%= pathConfig.client %>/app/**/*.spec.js',
          ]
        },
      ],
      singleRun: true,
      reporters: 'dots',
    },
  }
};
