
'use strict';

module.exports = {

  // usemin replaces the blocks by the file they reference, and replaces all references to assets by their revisioned version if it is found on the disk. 
  // This target modifies the files it is working on.
  usemin: {
    html: [
      '<%= pathConfig.dist %>/index.html'
    ],
    js: [
      '<%= pathConfig.dist %>/js/**/*.js'
    ],
    css: [
      '<%= pathConfig.dist %>/css/**/*.css',
    ], 
    options: {
      // revmap:
      assetsDirs: [
        '<%= pathConfig.dist %>'
      ],
      patterns: {
        html: [
          [/(js\/bundle\.js)/g, 'replace bundle.js in html']
        ],
        js: [
          [/(resources\/markdown\/[\/\w-]+\.(md))/g, 'replace markdown in js']
        ],
        css: [
          [/(images\/[\/\w-]+\.(png|gif|jpg|jpeg))/g, 'replace images in css'],
        ],
      }
    }
  }
};

