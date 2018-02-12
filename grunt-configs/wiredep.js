
'use strict';

module.exports = {
  // 在 html 中，自动引入 bower 下载的前端依赖文件，不需要手工写
  wiredep: {
    options: {
      exclude: [
        '/angularjs-unstable/'
      ],
    },

    app: {
      src: ['<%= pathConfig.client %>/index.html'],
      ignorePath: '../',
      devDependencies: false,
    },

    test: {
      src: '<%= pathConfig.gruntKarma %>',
      ignorePath: '../',
      devDependencies: true,
      fileTypes:{
        js: {
          block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
          detect: {
            js: /'(.*\.js)'/gi
          },
          replace: {
            js: '\'{{filePath}}\','
          }
        }
      }
    },

  }
};
