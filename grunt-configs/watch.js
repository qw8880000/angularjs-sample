module.exports = {

  // 监测文件改动，用于变化文件自动生效
  
  watch: {

    angularjs: {
      files: ['<%= pathConfig.client %>/app/**/*.js', '!<%= pathConfig.client %>/app/**/*.spec.js'],
      tasks: ['angularFileLoader'],
      options: {
        spawn: false,
        event: ['all']
      }
    }
  }
};

