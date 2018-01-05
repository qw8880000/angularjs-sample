
'use strict';

module.exports = {

  postcss: {
    options: {
      // map: true, // inline sourcemaps
      map: false,
      processors: [
        // require('pixrem')(), // add fallbacks for rem units
        // require('cssnano')() // minify the result
        require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
      ],
    },
    dist: {
      src: ['<%= pathConfig.tmp %>/concat/css/*.css'],
    },
  }
};

