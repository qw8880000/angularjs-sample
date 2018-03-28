// see: https://gruntjs.com/sample-gruntfile
module.exports = function(grunt) {
  
  var config = {
    pkg: grunt.file.readJSON('package.json'),
    pathConfig: {
      client: 'src/client/',
      server: 'src/server/',
      dist: 'dist/',
      tmp: '.tmp/',
      test: 'test/',
    },
  };

  var pluginsConfig = {

    // ---------------------------------- 
    // Clean files and folders
    // ---------------------------------- 
    clean: {
      dist: {
        src: [
          '<%= pathConfig.dist %>',
          '<%= pathConfig.tmp %>'
        ]
      },
    },

    // ---------------------------------- 
    // Copy files and folders 
    // ---------------------------------- 
    copy: {
      dist: {
        files: [
          // index.html
          {
            src: '<%= pathConfig.client %>/index.html',
            dest: '<%= pathConfig.dist %>/index.html',
          },
          // resources
          {
            expand: true,
            cwd: '<%= pathConfig.client %>/resources',
            src: '**',
            dest: '<%= pathConfig.dist %>/resources',
          },
          // icons
          {
            expand: true,
            cwd: '<%= pathConfig.client %>/icons/font-awesome',
            src: '**',
            dest: '<%= pathConfig.dist %>/icons/font-awesome',
          },
        ]
      }
    },

    // ---------------------------------- 
    // Validate files with [ESLint](https://eslint.org)
    // ---------------------------------- 
    eslint: {
      angularjs: {
        options: {
          // configFile: "<%= pathConfig.client %>/app/.eslintrc.json",
        },
        src: [
          '<%= pathConfig.client %>/app/**/*.js',
        ]
      },

      unitTest: {
        options: {
          // configFile: "<%= pathConfig.client %>/app/.eslintrc.json",
        },
        src: [
          '<%= pathConfig.test %>/unit/**/*.js',
        ]
      },

      e2eTest: {
        options: {
          // configFile: "<%= pathConfig.client %>/app/.eslintrc.json",
        },
        src: [
          '<%= pathConfig.test %>/e2e/**/*.js',
        ]
      }
    },

    // ---------------------------------- 
    // Simple grunt task for running an Express server that works great with LiveReload + Watch/Regarde
    // ---------------------------------- 
    express: {
      options: {
      },
      dev: {
        options: {
          script: '<%= pathConfig.server %>/app.js',
          debug: true
        }
      },
      dist: {
        options: {
          script: '<%= pathConfig.server %>/app.js',
          node_env: 'production'
        }
      },
    },

    // ---------------------------------- 
    // Static asset revisioning through file content hash
    // ---------------------------------- 
    filerev: {
      options: {
        algorithm: 'md5',
        length: 8
      },
      dist: {
        src: [
          '<%= pathConfig.dist %>/app/**/*.js',
          '<%= pathConfig.dist %>/css/**/*.css',
          // '<%= pathConfig.dist %>/img/**/*.{png,jpg,jpeg,gif,webp,svg}',
          // '<%= pathConfig.dist %>/vendor/**/*.*',
        ]
      }
    },

    // ---------------------------------- 
    // Inject references to files into other files 
    // ---------------------------------- 
    injector: {

      test2karma: {
        options: {
          template: '<%= pathConfig.test %>/karma.conf.js',
          starttag: '/*-- injector:test:js --*/',
          endtag: '/*-- endinjector --*/',
          transform: function (file) {
            var content = '\'file\',';
            return content.replace(/file/i, file);
          },
          // ignorePath: 'src/client/',
          addRootSlash: false
        },
        src: ['<%= pathConfig.test %>/unit/**/*.js'],
        dest: '<%= pathConfig.test %>/karma.conf.js'
      },

      test2protractor: {
        options: {
          template: '<%= pathConfig.test %>/protractor.conf.js',
          starttag: '/*-- injector:test:js --*/',
          endtag: '/*-- endinjector --*/',
          transform: function (file) {
            var content = '\'file\',';
            return content.replace(/file/i, file);
          },
          ignorePath: 'test/',
          addRootSlash: false
        },
        src: ['<%= pathConfig.test %>/e2e/**/*.js'],
        dest: '<%= pathConfig.test %>/protractor.conf.js'
      },

      help: {
        options: {
          template: '<%= pathConfig.client %>/index.html',
          starttag: '/*-- injector:test:js --*/',
          endtag: '/*-- endinjector --*/',
          transform: function (file) {
            var content = '\'file\',';
            return content.replace(/file/i, file);
          },
          ignorePath: 'test/',
          addRootSlash: false
        },
        src: ['<%= pathConfig.client %>/app/**/*.js'],
        dest: '<%= pathConfig.client %>/index.html'
      },
    },

    // ---------------------------------- 
    // Optimize PNG, JPEG, GIF, SVG images with grunt task.
    // ---------------------------------- 
    // 图片优化 
    image: {
      options: {
        optipng: false,
        pngquant: true,
        zopflipng: true,
        jpegRecompress: false,
        mozjpeg: true,
        guetzli: false,
        gifsicle: true,
        svgo: true
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= pathConfig.client %>/img',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: '<%= pathConfig.dist %>/img'
        }]
      }
    },

    // ---------------------------------- 
    // Grunt plugin for Karma
    // ---------------------------------- 
    karma: {
      dev: {
        configFile: '<%= pathConfig.test %>/karma.conf.js',
      },
    },

    // ---------------------------------- 
    // Compile scss files to CSS
    // ---------------------------------- 
    sass: {
      app: {
        options: {
          style: 'expanded',
        },
        files: {
          '<%= pathConfig.client %>/css/app.css': '<%= pathConfig.client %>/scss/app.scss',
        }
      }
    },

    // ---------------------------------- 
    // Add, remove and rebuild AngularJS dependency injection annotations.
    // ---------------------------------- 
    ngAnnotate: {
      options: {
        add: true,
        remove: true,
        singleQuotes: true,
      },
      dist: {
        // files: [{
        // expand: true,
        // cwd: '<%= pathConfig.dist %>/app',
        // src: '**/*.js',
        // dest: '<%= pathConfig.dist %>/app'
        // }]
        files: [{
          src: '<%= pathConfig.tmp %>/concat/app/app.min.js',
          dest: '<%= pathConfig.tmp %>/concat/app/app.min.js'
        }]
      },
    },


    // ---------------------------------- 
    // caching your HTML templates with `$templateCache`.
    // ---------------------------------- 
    ngtemplates: {
      options: {
        htmlmin: {
          collapseBooleanAttributes:      true,
          collapseWhitespace:             true,
          removeAttributeQuotes:          true,
          removeComments:                 true, // Only if you don't use comment directives! 
          removeEmptyAttributes:          true,
          removeRedundantAttributes:      true,
          removeScriptTypeAttributes:     true,
          removeStyleLinkTypeAttributes:  true
        },
      },

      dist: {
        options: {
          module: 'app',            // This came from the angular.module('app');
          standalone: false,
          usemin: 'app/app.min.js', // This came from the <!-- build:js --> block
        },
        cwd: '<%= pathConfig.client %>',
        src: 'app/**/*.html',
        dest: '<%= pathConfig.tmp %>/templates.js'
      }
    },

    // ---------------------------------- 
    // A Grunt plugin for running Protractor runner.
    // ---------------------------------- 
    protractor: {
      e2eTest: {
        configFile: '<%= pathConfig.test %>/protractor.conf.js',
      },
    },

    // ---------------------------------- 
    // Apply several post-processors to your CSS using [PostCSS](https://github.com/postcss/postcss).
    // ---------------------------------- 
    postcss: {
      options: {
        // map: true, // inline sourcemaps
        map: false,
        processors: [
          // require('pixrem')(), // add fallbacks for rem units
          // require('cssnano')() // minify the result
          require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
        ],
      },
      app: {
        src: ['<%= pathConfig.client %>/css/app.css'],
      },
      dist: {
        src: ['<%= pathConfig.tmp %>/concat/css/*.css'],
      },
    },

    // ---------------------------------- 
    // Grunt plugin for running [stylelint](http://stylelint.io/)
    // ---------------------------------- 
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
          '<%= pathConfig.client %>/scss/**/*.scss',
          '!<%= pathConfig.client %>/scss/vendors/**/*.scss',
        ]
      }
    },


    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: [
        '<%= pathConfig.client %>/index.html',
      ],
      options: {
        // The root directory from which your files will be resolved.
        root: ['<%= pathConfig.client %>'],
        // Base directory where the transformed files should be output.
        dest: '<%= pathConfig.dist %>',
        // Base directory where the temporary files should be output (e.g. concatenated files).
        staging: '<%= pathConfig.tmp %>',
        // This allow you to configure the workflow 
        flow: {
          steps: {
            css: ['concat', 'cssmin'],
            // js: ['concat', 'uglifyjs']
            js: ['concat', 'uglify']
          }, 
          post: {}
        }
      }
    },

    // usemin replaces the blocks by the file they reference, and replaces all references to assets by their revisioned version if it is found on the disk. 
    // This target modifies the files it is working on.
    usemin: {
      html: ['<%= pathConfig.dist %>/index.html'],
      // js: ['<%= pathConfig.dist %>/app/**/*.js'],
      // css: ['<%= pathConfig.dist %>/css/**/*.css'], 
      // resources: ['<%= pathConfig.dist %>/resources/**/*.json'],

      options: {
        // revmap:
        assetsDirs: [
          '<%= pathConfig.dist %>',
        ],
        patterns: {
          // js: [
            // [/(img\/[\/\w-]+.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing references to images']
          // ],
          // resources: [
            // [/(img\/[\/\w-\.\d]+.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing references to images']
          // ],
          // css: [
            // [/(img\/\w+.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing references to images']
          // ],
        }
      }
    },

    // ---------------------------------- 
    // Run predefined tasks whenever watched file patterns are added, changed or deleted
    // ---------------------------------- 
    watch: {
      css: {
        files: [
          '<%= pathConfig.client %>/scss/**/*.scss',
        ],
        tasks: ['stylelint', 'sass'],
        options: {
          livereload: true,
          spawn: false,
          event: ['all']
        }
      },
      js: {
        files: [
          '<%= pathConfig.client %>/app/**/*.js',
          '<%= pathConfig.test %>/**/*.js'
        ],
        tasks: ['eslint'],
        options: {
          spawn: false,
          event: ['all']
        }
      }
    },

    // ---------------------------------- 
    // Inject Bower packages into your source code with Grunt.
    // ---------------------------------- 
    wiredep: {
      options: {
      },

      app: {
        src: ['<%= pathConfig.client %>/index.html'],
        ignorePath: '../',
        devDependencies: false,
      },

      test: {
        src: '<%= pathConfig.test %>/karma.conf.js',
        ignorePath: '../',
        devDependencies: true,
        fileTypes:{
          js: {
            block: /(([\s\t]*)\/\*--\s*?bower:js\s*?--\*\/(\S*))(\n|\r|.)*?(\/\*--\s*endbower\s*--\*\/)/gi,
            detect: {
              js: /'(.*\.js)'/gi
            },
            replace: {
              js: '\'{{filePath}}\','
            }
          }
        }
      },
    },

  };

  grunt.util._.extend(config, pluginsConfig);
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

  // # js 与 css 合并与压缩
  // Replaces references from non-optimized scripts, stylesheets and other assets to their optimized version within a set of HTML files (or any templates/views)
  // 'useminprepare' is the first step, and the 'usemin' is the last step.
  // See grunt-usemin for help
  grunt.registerTask('replacesReferences', [
    'useminPrepare',
    'ngtemplates:dist',
    'concat:generated',
    // 'postcss:dist',
    'ngAnnotate:dist',
    'cssmin:generated',
    'uglify:generated',
    'filerev',
    'usemin'
  ]);

  grunt.registerTask('prepare', [
    'wiredep:app',
    'sass:app',
    'postcss:app',
    'eslint:angularjs',
    'stylelint',
  ]);

  // the default task can be run just by typing "grunt" on the command line
  grunt.registerTask('default', [
    'prepare',

    // start server
    'express:dev',
    'watch'
  ]);

  grunt.registerTask('devServer', [
    // start server
    'express:dev',
    'watch'
  ]);

  grunt.registerTask('dist', [
    'prepare',
    'unitTest',

    // build
    'clean:dist',
    'copy:dist',
    'image:dist',
    'replacesReferences',

    // start server
    'express:dist',
    'grunt-keepalive'
  ]);
  
  grunt.registerTask('distServer', [
    // start server
    'express:dist',
    'grunt-keepalive'
  ]);

  grunt.registerTask('unitTest', [
    'wiredep:test',
    'injector:test2karma',
    'eslint:unitTest',
    'karma:dev',
  ]);

  grunt.registerTask('e2eTest', [
    'injector:test2protractor',
    'eslint:e2eTest',
    'express:dev',
    'protractor:e2eTest',
  ]);

};

