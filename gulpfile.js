'use strict';

var gulp = require('gulp'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  connect = require('gulp-connect'),
  csscomb = require('gulp-csscomb'),
  sass = require('gulp-sass'),
  flexbugs = require('postcss-flexbugs-fixes'),
  babel = require('gulp-babel');

//connect
gulp.task('connect', function() {
  connect.server({
    root: './build/',
    livereload: true,
    port: 8888
  });
});

//js
gulp.task('js', function() {
  return gulp.src('./js/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./build/js/'))
    .pipe(connect.reload());
});

//css
gulp.task('css', function() {
  var processors = [autoprefixer({browsers: ['last 3 version', 'ie 10', 'ie 11']}), flexbugs];
  return gulp.src('./scss/main.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(postcss(processors))
  .pipe(csscomb())
  .pipe(gulp.dest('./build/css/'))
  .pipe(connect.reload());
});

//html
gulp.task('html', function(){
  return gulp.src('./build/index.html')
  .pipe(connect.reload());
});

//watch
gulp.task('watch', function(){
  gulp.watch('./js/*.js', ['js']);
  gulp.watch('./scss/*.scss', ['css']);
  gulp.watch('./build/index.html', ['html']);
});

//default
gulp.task('default', ['connect', 'js', 'html', 'css', 'watch']);