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

  // output some log when watched files are modified
  grunt.event.on('watch', function(action, filepath, target) {
    grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
  });

  // 保持 Grunt 运行
  grunt.registerTask('grunt-keepalive', 'Keep grunt running', function() {
    this.async();
  });

  // load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
  // so we don't need to excute 'grunt.loadNpmTasks('grunt-*')'
  require('load-grunt-tasks')(grunt);

  // the default task can be run just by typing "grunt" on the command line
  grunt.registerTask('default', [
    'watch'
  ]);
};

