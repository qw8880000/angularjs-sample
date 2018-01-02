
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

        // app
        {
          expand: true,
          cwd: '<%= pathConfig.client %>/app',
          src: '**',
          dest: '<%= pathConfig.dist %>/app',
        },

        // images 
        {
          expand: true,
          cwd: '<%= pathConfig.client %>/img',
          src: '**',
          dest: '<%= pathConfig.dist %>/img',
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

