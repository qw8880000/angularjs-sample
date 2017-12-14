// see: https://gruntjs.com/sample-gruntfile
module.exports = function(grunt) {
  
  var configLoader = require('./grunt-configsloader.js');
  var config = {
    pkg: grunt.file.readJSON('package.json'),
    pathConfig: {
      client: 'src/client',
    },
  };

  // get config from Gruntconfigs folder
  grunt.util._.extend(config, configLoader.load(__dirname + '/grunt-configs'));
  grunt.initConfig(config);

  // load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
  // so we don't need to excute 'grunt.loadNpmTasks('grunt-*')'
  require('load-grunt-tasks')(grunt);

  // output some log when watched files are modified
  grunt.event.on('watch', function(action, filepath, target) {
    grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
  });

  // 保持 Grunt 运行
  grunt.registerTask('grunt-keepalive', 'Keep grunt running', function() {
    this.async();
  });

  // # 自动注入
  // 1. wiredep: Inject Bower packages into your source code
  // 1. ngAnnotate: Inject AngularJS dependency
  // 1. compass: Compile Sass to CSS
  // 1. autoprefixer: parses CSS and adds vendor-prefixed CSS properties for brower compatibility
  grunt.registerTask('autoInject', [
    'wiredep',
    'angularFileLoader',
    // 'ngAnnotate',
    // 'sass',
    // 'autoprefixer',
  ]);

  // the default task can be run just by typing "grunt" on the command line
  grunt.registerTask('default', [
    'autoInject',
    'eslint',
    'express:dev',
    'watch'
  ]);
};

