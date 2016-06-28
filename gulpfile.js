const
  gulp = require('gulp'),
  cp = require('child_process'); 
  sass = require('gulp-sass'),
  plumber = require('gulp-plumber'),
  postcss = require('gulp-postcss'),
  browserSync = require('browser-sync').create(),
  jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

gulp.task('build',['scripts'], function (done) {
  return cp
    .spawn( jekyll , ['build'], {stdio: 'inherit'})
    .on('close', done);
});

gulp.task('build-jekyll',['build'], function () {
    browserSync.reload();
});

gulp.task('sass', function () {
  return
});

gulp.task('scripts', function () {
  return gulp.src('./resources/scripts/**/*.js')
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('./_site/resources/scripts'))
    .pipe(gulp.dest('./resources/scripts'));
});

gulp.task('serve',['scripts'], function () {
  browserSync.init({
    server: {
      baseDir: '_site/'
    },
    directory: true,
    startPath: 'index.html'
  });
  gulp.watch(['index.html','examples/**/*.html','_includes/**/*.html','_layouts/**/*.html'], ['build-jekyll']);
});

gulp.task('default', ['sass','scripts','build','serve']);