"use strict";

var gulp = require('gulp'),
	rename = require('gulp-rename'),
	minify = require('gulp-minifier'),
	jshint = require('gulp-jshint');
	
gulp.task('lint', function () {
  return gulp.src([
    '*.js'
  ])
  .pipe(jshint())
  .pipe(jshint.reporter('default', { verbose: true }))
  .pipe(jshint.reporter('fail'));
});
 
gulp.task('minify_css', function() {
  return gulp.src('./src/vendor/mn-file-upload/css/*')
  .pipe(minify({
    minify: true,
    collapseWhitespace: true,
    conservativeCollapse: true,
    minifyJS: true,
    minifyCSS: true,
    getKeptComment: function (content, filePath) {
        var m = content.match(/\/\*![\s\S]*?\*\//img);
        return m && m.join('\n') + '\n' || '';
    }
  }))
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('./dist/css'));
});

gulp.task('minify_js', function() {
  return gulp.src('./src/vendor/mn-file-upload/js/*')
  .pipe(minify({
    minify: true,
    collapseWhitespace: true,
    conservativeCollapse: true,
    minifyJS: true,
    minifyCSS: true,
    getKeptComment: function (content, filePath) {
        var m = content.match(/\/\*![\s\S]*?\*\//img);
        return m && m.join('\n') + '\n' || '';
    }
  }))
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('./dist/js'));
});

gulp.task('src', function () {
    return gulp.src('./src/vendor/mn-file-upload/**/*')
        .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['minify_js', 'minify_css', 'src']);
