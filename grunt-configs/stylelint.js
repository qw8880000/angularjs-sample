
'use strict';

module.exports = {
  // css 检查
  stylelint: {
    css: {
      options: {
        configFile: '.stylelintrc',
        formatter: 'string',
        ignoreDisables: false,
        failOnError: true,
        outputFile: '',
        reportNeedlessDisables: false,
        syntax: ''
      },
      src: [
        '<%= pathConfig.client %>/css/basic.css',
        '<%= pathConfig.client %>/css/style.css'
      ]
    }
  }
};
