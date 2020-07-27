var gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  sourcemap = require('gulp-sourcemaps'),
  csso = require('gulp-csso'),
  rename = require('gulp-rename'),
  less = require('gulp-less'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  del = require('del'),
  server = require('browser-sync').create(),
  svgmin = require('gulp-svgmin'),
  svgstore = require("gulp-svgstore");

gulp.task('css', function () {
  return gulp.src('source/less/style.less')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('source/css'))
    .pipe(server.stream());
});


gulp.task('normalize', function () {
  return gulp.src('node_modules/normalize.css/normalize.css')
    .pipe(gulp.dest('source/css'))
});

gulp.task('svgminimize', function () {
  return gulp.src('source/img/**/*.svg')
    .pipe(svgmin())
    .pipe(gulp.dest('source/img'));
});

gulp.task("sprite", function () {
  return gulp.src("source/img/sign_*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("source/img"));
});

// gulp.task('watch', function () {
//   gulp.watch('./less/**/*.less', ['css']);
// });

// gulp.task('default', ['css', 'watch']);

gulp.task('server', function () {
  server.init({
    server: 'source/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/less/**/*.less', gulp.series('css'));
  gulp.watch('source/*.html').on('change', server.reload);
});

gulp.task('start', gulp.series('normalize', 'css', 'server'));
