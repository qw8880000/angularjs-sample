
'use strict';

module.exports = {
  // 在 html 中，自动引入 bower 下载的前端依赖文件，不需要手工写
  wiredep: {
    app: {
      src: ['<%= pathConfig.client %>/index.html'],
      ignorePath: '../'
    }
  }
};
