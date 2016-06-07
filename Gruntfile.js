module.exports = function(grunt) {

    'use strict';

    // Project configuration
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        app: {
            path: {
                src     : 'src'
            },
            copyright   : '/*\n * Frontend Boilerplate v1.0\n * Copyright (c) 2016 Diego Teliz\n * Author: Diego Teliz\n * Author URI: http://diegoteliz.com/\n */\n'
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'css/*.css',
                        'js/*.js',
                        '**/*.html'
                    ]
                },
                options: {
                    watchTask: true,
                    server: './'
                }
            }
        },

        csslint: {
            options: {
                'adjoining-classes': false,
                'box-model': false,
                'box-sizing': false,
                'compatible-vendor-prefixes': false,
                'empty-rules': true,
                'errors': true,
                'display-property-grouping': true,
                'duplicate-background-images': true,
                'duplicate-properties': true,
                'fallback-colors': false,
                'floats': true,
                'font-faces': true,
                'font-sizes': false,
                'gradients': true,
                'ids': true,
                'import': true,
                'important': true,
                'known-properties': true,
                'outline-none': false,
                'overqualified-elements': true,
                'qualified-headings': false,
                'regex-selectors': false,
                'shorthand': true,
                'star-property-hack': false,
                'text-indent': true,
                'underscore-property-hack': true,
                'unique-headings': false,
                'universal-selector': false,
                'unqualified-attributes': true,
                'vendor-prefix': true,
                'zero-units': true
            },
            src: ['css/style.css']
        },

        jshint: {
            options: {
                camelcase: true,
                curly: true,
                eqeqeq: true,
                indent: 4,
                latedef: true,
                newcap: true,
                noempty: true,
                nonew: true,
                quotmark: 'single',
                strict: true,
                globals: {
                    jQuery: true
                }
            },
            src: [
                'Gruntfile.js',
                '<%= app.path.src %>/js/scripts.js'
            ]
        },

        postcss: {
            options: {

                processors: [
                    require('pixrem')(),
                    require('autoprefixer')({browsers: 'last 2 versions'}),
                    require('cssnano')()
                ]
            },
            dist: {
                src: 'css/style.css'
            }
        },

        sass: {
            dev: {
                options: {
                    cacheLocation: '.tmp/.sass-cache',
                    style: 'expanded'
                },
                files: [{
                    'css/style.css': '<%= app.path.src %>/sass/style.scss'
                }]
            }
        },

        uglify: {
            options: {
                mangle: true,
                compress: true,
                banner: '<%= app.copyright %>',
                quoteStyle: 3
            },
            dev: {
                files: {
                    'js/scripts.js' : ['<%= app.path.src %>/js/scripts.js']
                }
            }

        },

        watch: {
            sass: {
                files: '<%= app.path.src %>/sass/**/*.scss',
                tasks: ['sass', 'postcss', 'csslint'],
                options: {
                    livereload: true,
                    sourcemap: 'auto'
                }
            },
            scripts: {
                files: ['Gruntfile.js', '<%= app.path.src %>/js/**/*.js'],
                tasks: ['uglify', 'jshint'],
                options: {
                    livereload: true
                }
            },
            files: {
                files: ['**/*.html', 'img/**'],
                options: {
                    livereload: true
                }
            }
        }

    });

    // Load plugin tasks
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Tasks
    grunt.registerTask('default', ['dev']);

    grunt.registerTask('dev', [
        'sass',
        'postcss',
        'csslint',
        'uglify',
        'jshint',
        'browserSync',
        'watch'
    ]);
    grunt.registerTask('build', [
        'sass',
        'postcss',
        'csslint',
        'uglify',
        'jshint'
    ]);

};
