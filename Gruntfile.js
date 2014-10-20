/*
 * grunt-genwpstylecss
 * https://github.com/stefanfisk/grunt-genwpstylecss
 *
 * Copyright (c) 2014 Stefan Fisk
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    genwpstylecss: {
      default_options: {
        options: {
        },
        dest: 'tmp/default_options'
      },
      custom_options: {
        options: {
            name: 'THEME_NAME',
            description: 'DESCRIPTION',
            version: 'VERSION',
            uri: 'THEME_URI',
            tags: ['TAG1', 'TAG2', 'TAG3'],
            author: 'AUTHOR',
            authorUri: 'AUTHOR_URI',
            license: 'LICENSE',
            licenseUri: 'LICENSE_URI'
        },
        dest: 'tmp/custom_options'
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'genwpstylecss', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
