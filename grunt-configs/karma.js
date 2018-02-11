
'use strict';

module.exports = {

  karma: {

    options: {
      browsers: ['Chrome'],
      frameworks: ['jasmine'],
      plugins: [
        'karma-chrome-launcher',
        'karma-jasmine'
      ],
    },

    dev: {
      files: [
        {src: ['<%= pathConfig.client %>/app/**/*.spec.js']},
      ],
      singleRun: true,
      reporters: 'dots',
    },
  }
};
