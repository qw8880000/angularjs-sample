
'use strict';

module.exports = {
  // Caching your HTML templates with $templateCache 
  ngtemplates: {
    options: {
      htmlmin: {
        collapseBooleanAttributes:      true,
        collapseWhitespace:             true,
        removeAttributeQuotes:          true,
        removeComments:                 true, // Only if you don't use comment directives! 
        removeEmptyAttributes:          true,
        removeRedundantAttributes:      true,
        removeScriptTypeAttributes:     true,
        removeStyleLinkTypeAttributes:  true
      },
    },

    app: {
      options: {
        module: 'app',            // This came from the angular.module('app');
        standalone: false,
        usemin: 'app/app.min.js', // This came from the <!-- build:js --> block
      },
      cwd: '<%= pathConfig.client %>',
      src: 'app/**/*.html',
      dest: '<%= pathConfig.tmp %>/templates.js'
    }
  }
};
