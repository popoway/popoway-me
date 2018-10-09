module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      dist: "dist"
    },
    copy: {
      'dev-css': {
        files: [
          // includes files within path and its sub-directories
          {expand: true, cwd: 'app/styles', src: ['**'], dest: 'dist/styles'},
        ],
      },
    },
    cssmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app/styles',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/styles',
          ext: '.min.css'
        }]
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
          'dist/index.html': 'app/index.html'
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
          'dist/index.html': 'app/index.html'      // 'destination': 'source'
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
        files: { 'dist/scripts/app.min.js': ['app/scripts/app.js'] }
      },
    },
    HTMLbanner: '<!-- ! \n' +
                '    * This file is part of <%= pkg.name %> v<%= pkg.version %> (<%= gitinfo.local.branch.current.shortSHA %>) (<%= pkg.author.url %>)\n' +
                '    * Copyright <%= grunt.template.today("yyyy") %> The <%= pkg.name %> Authors (https://github.com/popoway/popoway-me/graphs/contributors)\n' +
                '    * Licensed under the <%= pkg.license %> License. (https://github.com/popoway/popoway-me/blob/master/LICENSE)\n ' +
                ' -->',
    JSbanner: '/*!\n' +
              ' * This file is part of <%= pkg.name %> v<%= pkg.version %> (<%= gitinfo.local.branch.current.shortSHA %>) (<%= pkg.author.url %>)\n' +
              ' * Copyright <%= grunt.template.today("yyyy") %> The <%= pkg.name %> Authors (https://github.com/popoway/popoway-me/graphs/contributors)\n' +
              ' * Licensed under the <%= pkg.license %> License. (https://github.com/popoway/popoway-me/blob/master/LICENSE)\n ' +
              '*/',
    usebanner: {
      HTML: {
        options: {
          position: 'top',
          banner: '<%= HTMLbanner %>'
        },
        files: {
          src: [ 'dist/index.html' ]
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
    }
  });

  // Load the plugin that provides those tasks.
  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-codesign');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-gitinfo');

  // compound builder tasks
  grunt.registerTask('devTask', [
    'clean',
    'gitinfo',
    'uglify:dev',
    'copy:dev-css',
    'htmlmin:dev',
    'usebanner:HTML',
    'usebanner:JS'
  ]);

  grunt.registerTask('betaTask', [
    'clean',
    'gitinfo',
    'uglify:dist',
    'cssmin:dist',
    'htmlmin:dist',
    'usebanner:HTML',
    'usebanner:JS'
  ]);

  grunt.registerTask('distTask', [
    'clean',
    'gitinfo',
    'uglify:dist',
    'cssmin:dist',
    'htmlmin:dist',
    'usebanner:HTML',
    'usebanner:JS'
  ]);

  // entry point tasks
  grunt.registerTask('default', 'Default: build dev version', ['devTask']);
  grunt.registerTask('dev', 'dev: build dev version', ['devTask']);
  grunt.registerTask('beta', 'beta: build beta(pre-prelease) version', ['betaTask']);
  grunt.registerTask('dist', 'dist: build offical release version', ['distTask']);

};
