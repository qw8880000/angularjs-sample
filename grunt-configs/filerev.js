
'use strict';

module.exports = {
  // 给文件改名，避免升级新版本浏览器缓存旧的文件
  filerev: {
    options: {
      algorithm: 'md5',
      length: 8
    },
    js: {
      src: '<%= pathConfig.dist %>/js/**/*.js',
    },
    css: {
      src: '<%= pathConfig.dist %>/css/**/*.css',
    },
    resources: {
      src:'<%= pathConfig.dist %>/resources/**/*.*',
    },
    img: {
      src:'<%= pathConfig.dist %>/img/**/*.*',
    },
  }
};
