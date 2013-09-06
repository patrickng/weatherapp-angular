/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;',
    
    // Define our source and build folders
    js_src_path: 'js',
    js_build_path: "build/js",
    css_src_path: "css",
    css_build_path: "build/css",

    // Task configuration.
    concat: {
      options: {
        separator: ';'
      },
      js: {
        src: ['<%= js_src_path %>/*.js'],
        dest: '<%= js_build_path %>/app.js'
      },
      css: {
        src: ['<%= css_src_path %>/*.css'],
        dest: '<%= css_build_path %>/app.css'   
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      js: {
        src: '<%= concat.js.dest %>',
        dest: '<%= js_build_path %>/app.min.js'
      }
    },
    cssmin: {
      css: {
        src: '<%= concat.css.dest %>',
        dest:'<%= css_build_path %>/app.min.css'
      }
    },
    watch: {
      files: ["**/*.html", "**/*.js",  "**/js/**", "css/*.css"],
      options: {
        livereload: true
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  // Default task.
  grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);
};
