var gulp            = require('gulp'),
    autoprefixer    = require('gulp-autoprefixer'),
    browserSync     = require('browser-sync').create(),
    csslint         = require('gulp-csslint'),
    sass            = require('gulp-sass'),
    sourcemaps      = require('gulp-sourcemaps');

// TODO: config
// App config
var app = {
    
        path: {
            srcDir: 'src',
            cssDir: 'css',
            sassFiles: [
                'src/sass/**/*.scss'
            ],
            htmlFiles: [
                '**/*.html'
            ]
        },
        
        copyright: [
            '/*\n * Frontend Boilerplate v1.0\n * Copyright (c) 2016 Diego Teliz\n * Author: Diego Teliz\n * Author URI: http://diegoteliz.com/\n */\n'
        ]
    },

    csslintOptions = {
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
    };

// Static Server + watching files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: './'
        //notify: false
    });

    gulp.watch(app.path.sassFiles, ['sass']);
    gulp.watch(app.path.htmlFiles).on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {

    return gulp.src(app.path.sassFiles)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(csslint(csslintOptions))
        .pipe(csslint.reporter())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(app.path.cssDir))
        .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('default', ['serve']);