
module.exports = {

    // 启动express server
    express: {
      options: {
      },
      dev: {
        options: {
          script: './src/server/app.js',
          debug: true
        }
      },
      dist: {
        options: {
          script: './src/server/app.js',
          node_env: 'production'
        }
      },
      test: {
        options: {}
      }
    }
};
