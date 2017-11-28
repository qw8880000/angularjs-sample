module.exports = {

  eslint: {
    client: {
      options: {
        configFile: "./.eslintrc.json",
      },
      src: ['<%= pathConfig.client %>/app/**/*.js']
    }
  }
};
