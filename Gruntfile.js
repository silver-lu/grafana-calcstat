module.exports = (grunt) => {
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks('grunt-execute');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.initConfig({

    ts: {
      default : {
        src: ['**/*.ts', '!node_modules/**/*.ts']
      }
    },

    clean: ['dist'],

    copy: {
      src_to_dist: {
        cwd: 'src',
        expand: true,
        src: ['**/*', '!**/*.js', '!**/*.scss', '!img/**/*'],
        dest: 'dist/calcstat'
      },
      external_to_dist: {
        cwd: 'src/vendor',
        expand: true,
        src: ['**/*.js'],
        dest: 'dist/calcstat/vendor'
      },
      pluginDef: {
        expand: true,
        src: ['plugin.json', 'README.md'],
        dest: 'dist/calcstat',
      },
      img_to_dist: {
        cwd: 'src/img',
        expand: true,
        src: ['**/*'],
        dest: 'dist/calcstat/img'
      },
      tpl_to_dist: {
        cwd: 'src/tpl',
        expand: true,
        src: ['**/*'],
        dest: 'dist/calcstat/tpl'
      }
    },

    watch: {
      rebuild_all: {
        files: ['src/**/*', 'plugin.json'],
        tasks: ['default'],
        options: {spawn: false}
      },
    },

    babel: {
      options: {
        sourceMap: true,
        presets: ['es2015'],
        plugins: ['transform-es2015-modules-systemjs', 'transform-es2015-for-of'],
      },
      dist: {
        files: [{
          cwd: 'src',
          expand: true,
          src: ['*.js'],
          dest: 'dist/calcstat',
          ext: '.js'
        }]
      },
    },

  });

  grunt.registerTask('default', ['clean', 'copy:pluginDef', 'copy:tpl_to_dist', 'copy:img_to_dist', 'babel']);
};

