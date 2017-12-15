module.exports = {

  ngAnnotate: {
    options: {
      add: true,
      remove: true,
      singleQuotes: true,
    },

    app: {
      files: [{
        expand: true,
        cwd: '<%= pathConfig.dist %>/app',
        src: '**/*.js',
        dest: '<%= pathConfig.dist %>/app'
      }]
    }
  }
};
