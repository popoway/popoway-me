module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      dist: "dist",
      temp: "temp"
    },
    concat: {
      options: {
        separator: '\n', // new line
      },
      home: {
        src: ['app/templates/head.html', 'app/templates/navbar.html',
              'app/templates/home.html',
              'app/templates/footer.html',
              'app/templates/script.html'],
        dest: 'temp/index.html',
      },
      leadership: {
        src: ['app/templates/head.html', 'app/templates/navbar.html',
              'app/templates/second.html',
              'app/templates/footer.html',
              'app/templates/script.html'],
        dest: 'temp/leadership.html',
      },
      social: {
        src: ['app/templates/head.html', 'app/templates/navbar.html',
              'app/templates/social.html',
              'app/templates/footer.html', 'app/templates/menu/wechat-qr-popup.html',
              'app/templates/script.html'],
        dest: 'temp/social.html',
      },
      social_az: {
        src: ['app/templates/head.html', 'app/templates/navbar.html',
              'app/templates/social-az.html',
              'app/templates/footer.html', 'app/templates/menu/wechat-qr-popup.html',
              'app/templates/script.html'],
        dest: 'temp/social-az.html',
      },
      career: {
        src: ['app/templates/head.html', 'app/templates/navbar.html',
              'app/templates/contact.html',
              'app/templates/footer.html',
              'app/templates/script.html'],
        dest: 'temp/career.html',
      },
      contact: {
        src: ['app/templates/head.html', 'app/templates/navbar.html',
              'app/templates/contact.html',
              'app/templates/footer.html',
              'app/templates/script.html'],
        dest: 'temp/contact.html',
      },
    },
    copy: {
      'dev-css': {
        files: [
          // includes files within path and its sub-directories
          {expand: true, cwd: 'app/styles', src: ['**'], dest: 'dist/styles'},
        ],
      },
      assets: {
        files: [
          // includes files within path and its sub-directories
          {expand: true, cwd: 'app/icons', src: ['**'], dest: 'dist/icons'},
          {expand: true, cwd: 'app/images', src: ['**'], dest: 'dist/images'},
          {expand: true, cwd: 'app/locales', src: ['**'], dest: 'dist/locales'},
        ],
      }
    },
    cssmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app/styles',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/styles',
          ext: '.css'
        }]
      }
    },
    express: {
       options: {
         // Override defaults here
       },
       dev: {
         options: {
           script: 'server.js'
         }
       }
     },
    gitinfo: {
      branch: {
        current: {
          SHA: 'Current HEAD SHA',
          shortSHA: 'Current HEAD short SHA',
          name: 'Current branch name',
          lastCommitTime: 'Last commit time'
        }
      }
    },
    htmlmin: {
      dev: {                                       // Another target: dev
        options: {                                 // Target options
          caseSensitive: true,
          collapseWhitespace: false,
          removeComments: false
        },
        files: {
          'dist/index.html': 'temp/index.html',
          'dist/leadership/index.html': 'temp/leadership.html',
          'dist/social/index.html': 'temp/social.html',
          'dist/social/az/index.html': 'temp/social-az.html',
          'dist/career/index.html': 'temp/career.html',
          'dist/contact/index.html': 'temp/contact.html'
        }
      },                                   // Task
      dist: {                                      // Target
        options: {                                 // Target options
          caseSensitive: true,
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true,
          removeComments: true
        },
        files: {                                   // Dictionary of files
          'dist/index.html': 'temp/index.html',
          'dist/leadership/index.html': 'temp/leadership.html',
          'dist/social/index.html': 'temp/social.html',
          'dist/social/az/index.html': 'temp/social-az.html',
          'dist/career/index.html': 'temp/career.html',
          'dist/contact/index.html': 'temp/contact.html'
        }
      }
    },
    uglify: {
      dev: {
        options: {
          preserveComments: 'all',
          beautify: true
        },
        files: { 'dist/scripts/app.js': ['app/scripts/app.js'] }
      },
      dist: {
        options: {
          preserveComments: false
        },
        files: { 'dist/scripts/app.js': ['app/scripts/app.js'] }
      },
    },
    HTMLbanner: '<!-- ! \n' +
                '    * This file is part of <%= pkg.name %> v<%= pkg.version %> (<%= gitinfo.local.branch.current.shortSHA %>) (<%= pkg.author.url %>)\n' +
                '    * Copyright <%= grunt.template.today("yyyy") %> The <%= pkg.name %> Authors (https://github.com/popoway/popoway-me/graphs/contributors)\n' +
                '    * Licensed under the <%= pkg.license %> License. (https://github.com/popoway/popoway-me/blob/master/LICENSE)\n ' +
                ' -->',
    livereloadbanner: '<script src="//localhost:35729/livereload.js"></script>',
    JSbanner: '/*!\n' +
              ' * This file is part of <%= pkg.name %> v<%= pkg.version %> (<%= gitinfo.local.branch.current.shortSHA %>) (<%= pkg.author.url %>)\n' +
              ' * Copyright <%= grunt.template.today("yyyy") %> The <%= pkg.name %> Authors (https://github.com/popoway/popoway-me/graphs/contributors)\n' +
              ' * Licensed under the <%= pkg.license %> License. (https://github.com/popoway/popoway-me/blob/master/LICENSE)\n ' +
              '*/',
    open: {
      dev: {
        path: 'http://localhost:3000/'
      }
    },
    usebanner: {
      HTML: {
        options: {
          position: 'top',
          banner: '<%= HTMLbanner %>'
        },
        files: {
          src: [ 'dist/index.html',
                 'dist/leadership/index.html',
                 'dist/social/index.html',
                 'dist/social/az/index.html',
                 'dist/career/index.html',
                 'dist/contact/index.html'
               ]
        }
      },
      HTMLdev: {
        options: {
          position: 'top',
          banner: '<%= HTMLbanner %><%= livereloadbanner %>'
        },
        files: {
          src: [ 'dist/index.html',
                 'dist/leadership/index.html',
                 'dist/social/index.html',
                 'dist/social/az/index.html',
                 'dist/career/index.html',
                 'dist/contact/index.html'
               ]
        }
      },
      JS: {
        options: {
          position: 'top',
          banner: '<%= JSbanner %>'
        },
        files: {
          src: [ 'dist/scripts/*.js', 'dist/styles/*.css' ]
        }
      }
    },
    watch: {
      options: {
        // Start a live reload server on the default port 35729
        livereload: true,
      },
      dev: {
        files: ['app/**/*.*', 'Gruntfile.js'],
        tasks: ['dev']
      }
    }
  });

  // Load the plugin that provides those tasks.
  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-codesign');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-gitinfo');
  grunt.loadNpmTasks('grunt-open');

  // compound builder tasks
  grunt.registerTask('devTask', [
    'clean:dist',
    'gitinfo',
    'uglify:dev',
    'copy:dev-css',
    'concat',
    'htmlmin:dev',
    'usebanner:HTMLdev',
    'usebanner:JS',
    'copy:assets',
    'clean:temp'
  ]);

  grunt.registerTask('betaTask', [
    'clean:dist',
    'gitinfo',
    'uglify:dist',
    'cssmin:dist',
    'concat',
    'htmlmin:dist',
    'usebanner:HTML',
    'usebanner:JS',
    'copy:assets',
    'clean:temp'
  ]);

  grunt.registerTask('distTask', [
    'clean:dist',
    'gitinfo',
    'uglify:dist',
    'cssmin:dist',
    'concat',
    'htmlmin:dist',
    'usebanner:HTML',
    'usebanner:JS',
    'copy:assets',
    'clean:temp'
  ]);

  grunt.registerTask('server', [
    'express',
    'open',
    'watch'
  ]);

  // entry point tasks
  grunt.registerTask('default', 'Default: build and test dev version', ['test']);
  grunt.registerTask('test', 'test: build and test dev version', ['dev', 'server']);
  grunt.registerTask('dev', 'dev: build dev version', ['devTask']);
  grunt.registerTask('beta', 'beta: build beta(pre-prelease) version', ['betaTask']);
  grunt.registerTask('dist', 'dist: build offical release version', ['distTask']);

};
