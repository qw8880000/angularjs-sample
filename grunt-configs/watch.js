module.exports = {

  // 监测文件改动，用于变化文件自动生效
  
  watch: {

    cssCheck: {
      files: [
        '<%= pathConfig.client %>/css/basic.css',
        '<%= pathConfig.client %>/css/style.css'
      ],
      tasks: ['stylelint'],
      options: {
        spawn: false,
        event: ['all']
      }
    },

    jsCheck: {
      files: ['<%= pathConfig.client %>/app/**/*.js'],
      tasks: ['eslint'],
      options: {
        spawn: false,
        event: ['all']
      }
    }
  }
};

