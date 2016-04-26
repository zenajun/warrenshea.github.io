const gulp = require('gulp'),
  cp = require('child_process'); 
	sass = require('gulp-sass'),
	plumber = require('gulp-plumber'),
  postcss      = require('gulp-postcss'),
	browserSync = require('browser-sync').create();
const jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

gulp.task('build',['sass','scripts'], function (done) {
    return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
        .on('close', done);
});

gulp.task('build-jekyll',['build'], function () {
    browserSync.reload();
});

gulp.task('sass', function () {
  return
});

gulp.task('scripts', function () {
  return
});

gulp.task('serve',[], function () {
    browserSync.init({
      server: {
        baseDir: '_site/'
      },
      directory: true,
      startPath: 'index.html'
    });
});

gulp.task('default', ['sass','scripts','build','serve']);