const
  gulp = require('gulp'),
  cp = require('child_process'),
  autoprefixer = require('autoprefixer'),
  sass = require('gulp-sass'),
  plumber = require('gulp-plumber'),
  postcss = require('gulp-postcss'),
  browserSync = require('browser-sync').create(),
  jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

const src = {
  html: ['index.html','examples/**/*.html','_includes/**/*.html','_layouts/**/*.html'],
  js:   './_source/_scripts/**/*.{js,json}',
  scss: './_source/_sass/**/*.scss'
};

gulp.task('build',['sass','scripts'], function (done) {
  'use strict'
  return cp
    .spawn( jekyll , ['build'], {stdio: 'inherit'})
    .on('close', done);
});

gulp.task('build-jekyll',['build'], function () {
    browserSync.reload();
});

gulp.task('sass', function () {
  'use strict'
  return gulp.src(src.scss)
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions','Android 4.4','iOS 8.0'] }) ]))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('./_site/resources/stylesheets'))
    .pipe(gulp.dest('./resources/stylesheets'))
});

gulp.task('scripts', function () {
  'use strict'
  return gulp.src(src.js)
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('./_site/resources/scripts'))
    .pipe(gulp.dest('./resources/scripts'));
});

gulp.task('serve',['sass','scripts'], function () {
  browserSync.init({
    server: {
      baseDir: '_site/'
    },
    directory: true,
    startPath: 'index.html'
  });
  gulp.watch( src.scss, ['sass', 'build']);
  gulp.watch( src.js, ['scripts', 'build']);
  gulp.watch( src.html, ['build']);
});

gulp.task('default', ['sass','scripts','build','serve']);