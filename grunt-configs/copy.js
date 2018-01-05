
'use strict';

module.exports = {

  copy: {
    dist: {
      files: [

        // index.html
        {
          src: '<%= pathConfig.client %>/index.html',
          dest: '<%= pathConfig.dist %>/index.html',
        },

        // resources
        {
          expand: true,
          cwd: '<%= pathConfig.client %>/resources',
          src: '**',
          dest: '<%= pathConfig.dist %>/resources',
        },
      ]
    }
  }
};

