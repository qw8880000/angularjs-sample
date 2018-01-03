
'use strict';

module.exports = {

  // 图片优化 
  image: {
    options: {
      optipng: false,
      pngquant: true,
      zopflipng: true,
      jpegRecompress: false,
      mozjpeg: true,
      guetzli: false,
      gifsicle: true,
      svgo: true
    },

    dist: {
      files: [{
        expand: true,
        cwd: '<%= pathConfig.client %>/img',
        src: ['**/*.{png,jpg,gif,svg}'],
        dest: '<%= pathConfig.dist %>/img'
      }]
    }
  }
};
