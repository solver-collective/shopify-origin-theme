'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const changed = require('gulp-changed');
const concat = require('gulp-concat');
const csslint = require('gulp-csslint');
const rename = require("gulp-rename");
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const cleanCss = require('gulp-clean-css');
const postcss  = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

/**
 * Browserstack Local Server
 */
gulp.task('browser-sync', function () {
    browserSync.init({
      proxy: {
        target: 'https://your-brand-store.myshopify.com'
      },
      reloadDelay: 800
    });
  });
  
gulp.task('bs-reload', function () {
    browserSync.reload();
});


// Build Bootstrap Theme
gulp.task('sass', function() {
    return gulp.src(['sass/*.scss'])
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(postcss([ autoprefixer({ browsers: [
        'Chrome >= 35',
        'Firefox >= 38',
        'Edge >= 12',
        'Explorer >= 10',
        'iOS >= 8',
        'Safari >= 8',
        'Android 2.3',
        'Android >= 4',
        'Opera >= 12']})]))
      .pipe(sourcemaps.write())
      .pipe(rename('brand-custom-theme.css'))
      .pipe(gulp.dest('../assets/'))
      .pipe(cleanCss())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('../assets/'))
  });

/**
 * JavaScript tasks
 *
 * @type {string}
 */
const jsCustom = 'javascript/babel/*.js';
const jsVendor = 'javascript/vendor/*/*.*';
const jsDest = '../assets/';

gulp.task('js-vendor', function () {
    gulp.src(jsVendor)
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest(jsDest));
  });

gulp.task('js-custom', function () {
    return gulp.src(jsCustom)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('brand-custom-theme.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});



/**
 * Images task
 */
gulp.task('images', function () {
    return gulp.src('image/*/*.*')
        .pipe(rename({dirname: ''}))
        .pipe(changed('../assets/')) // ignore unchanged files
        .pipe(gulp.dest('../assets/'))
});

/**
 * Fonts task
 */
gulp.task('fonts', function () {
    return gulp.src('font/**')
        .pipe(changed('../assets/')) // ignore unchanged files
        .pipe(gulp.dest('../assets/'))
});

/**
 * Prepare Local Environment with Assets
 */
gulp.task('local', ['js-vendor', 'js-custom', 'sass'], function () {
});


/**
 * Watch task
 */
gulp.task('watch', ['browser-sync'], function () {
    gulp.watch('sass/*.scss', ['sass']);
    gulp.watch('javascript/vendor/*/*.*', ['js-vendor']);
    gulp.watch('javascript/**/*.js', ['js-custom']);
    gulp.watch('image/*/*.{jpg,jpeg,png,gif,svg}', ['images']);
    gulp.watch('font/*.{eot,svg,ttf,woff,woff2}', ['fonts']);
    gulp.watch('shopify-ping.tmp', ['bs-reload']);
});
