/*
 * grunt-genwpstylecss
 * https://github.com/stefanfisk/grunt-genwpstylecss
 *
 * Copyright (c) 2014 Stefan Fisk
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
    'use strict';

    grunt.registerMultiTask('genwpstylecss', 'Generates WordPress theme style.css files from package.json.', function() {
        var _s = require('underscore.string');

        var pkg = grunt.file.readJSON('package.json');

        var options = this.options({
            name: _s.titleize(_s.humanize(pkg.name)),
            description: pkg.description,
            version: pkg.version,
            uri: pkg.homepage,
            tags: pkg.keywords,
            author: pkg.author.name,
            authorUri: pkg.author.url,
            license: pkg.license,
            licenseUri: null
        });

        /*
        Theme Name:     <%= options.name %>
        Description:    <%= options.description %>
        Version:        <%= options.version %>
        Theme URI:      <%= options.homepage %>
        Tags:           <%= options.keywords %>
        Author:         <%= options.author.name %>
        Author URI:     <%= options.author.url %>
        License:        <%= options.license %>
        License URI:    <%= options.licenseUri %>
        */
        var contents = '/*\n';

        if (!options.name) {
            grunt.log.error('"name" option is required.');
            return false;
        }

        contents += 'Theme Name:     ' + options.name + '\n';

        if (options.description) {
            contents += 'Description:    ' + options.description + '\n';
        }
        if (options.version) {
            contents += 'Version:        ' + options.version + '\n';
        }
        if (options.uri) {
            contents += 'Theme URI:      ' + options.uri + '\n';
        }
        if (options.tags) {
            contents += 'Tags:           ' + options.tags + '\n';
        }
        if (options.author.name) {
            contents += 'Author:         ' + options.author.name + '\n';
        }
        if (options.author.uri) {
            contents += 'Author URI:     ' + options.author.uri + '\n';
        }
        if (options.license) {
            contents += 'License:        ' + options.license + '\n';
        }
        if (options.licenseUri) {
            contents += 'License URI:    ' + options.licenseUri + '\n';
        }

        contents += '*/\n';

        grunt.log.writeln('\n' + contents);

        this.files.forEach(function(file) {
            grunt.file.write(file.dest, contents);

            grunt.log.ok('File "' + file.dest + '" created.');
        });
    });
};
