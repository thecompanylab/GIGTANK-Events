module.exports = function(grunt) {
 
  grunt.registerTask('watch', [ 'watch' ]);
 
  grunt.initConfig({
    concat: {
      js: {
        options: {
          separator: ';'
        },
        src: [
          'js/domready.js',
          'js/blasts.js',
          'js/core.js',
          'js/chabus.js',
          'js/viewcal.js',
          'js/mustache.js'
        ],
        dest: 'js/core.min.js'
      },
    },
    uglify: {
      options: {
        mangle: false
      },
      js: {
        files: {
          'js/core.min.js': ['js/core.min.js']
        }
      }
    },
    sass: {
      dist: {
        options: {
            loadPath: require('node-bourbon').includePaths
            },
        files: {
          "css/screen.css": "sass/screen.scss"
        }
      }
    },
    watch: {
      js: {
        files: ['js/core.js', 'js/chabus.js', 'js/viewcal.js'],
        tasks: ['concat:js', 'uglify:js'],
        options: {
          livereload: true,
        }
      },
      css: {
        files: ['sass/*.scss'],
        tasks: ['sass:dist'],
        options: {
          livereload: true,
        }
      }
    }
  });
 
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
 
};

