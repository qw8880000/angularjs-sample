
'use strict';

module.exports = {
  // Reads HTML for usemin blocks to enable smart builds that automatically
  // concat, minify and revision files. Creates configurations in memory so
  // additional tasks can operate on them
  useminPrepare: {
    html: [
      '<%= pathConfig.client %>/index.html',
    ],
    options: {
      // The root directory from which your files will be resolved.
      root: ['<%= pathConfig.client %>'],
      // Base directory where the transformed files should be output.
      dest: '<%= pathConfig.dist %>',
      // Base directory where the temporary files should be output (e.g. concatenated files).
      staging: '<%= pathConfig.tmp %>',
      // This allow you to configure the workflow 
      flow: {
        steps: {
          css: ['concat', 'cssmin'],
          // js: ['concat', 'uglifyjs']
          js: ['concat', 'uglify']
        }, 
        post: {}
      }
    }
  }
};

