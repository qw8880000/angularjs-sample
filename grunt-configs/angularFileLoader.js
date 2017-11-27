module.exports = {

  angularFileLoader: {
    options: {
      scripts: ['<%= pathConfig.client %>/app/**/*.js', '!<%= pathConfig.client %>/app/**/*.spec.js']
    },
    default_options: {
      src: ['<%= pathConfig.client %>/index.html']
    }
  }

};
