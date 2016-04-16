var gulp = require('gulp'),
    gutil = require('gulp-util'),
    webserver = require('gulp-webserver'),
    changed = require('gulp-changed'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    path = require('path'),
    watch = require('gulp-watch');

gulp.task('js', function() {
  gulp.src('public/js/**/*')
});

gulp.task('html', function() {
  gulp.src('public/*.html')
});

gulp.task('less', function () {  
  gulp.src('less/main.less')
    .pipe(changed('css'))
    .pipe(less())
    .pipe(gulp.dest('css'))
    .on('error', gutil.log);
});

gulp.task('watch', function() {
  gulp.watch('js/**/*', ['js']);
  gulp.watch('less/**/*.less', ['less']);
  gulp.watch(['./**/*.html',
    '*.html'], ['html']);
});

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      host: 'db.local',
      open: true,
      port: 8800
    }));
});

gulp.task('default', ['watch', 'html', 'js', 'webserver', 'less']); 

