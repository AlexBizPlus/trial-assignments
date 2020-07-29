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
  svgstore = require("gulp-svgstore"),
  posthtml = require("gulp-posthtml"),
  include = require("posthtml-include");

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
    .pipe(gulp.dest('build/css'));
});


gulp.task('normalize', function () {
  return gulp.src('node_modules/normalize.css/normalize.css')
    .pipe(gulp.dest('source/css'))
});

gulp.task("clean", function () {
  return del("build");
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
    .pipe(gulp.dest("build/img"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("copy", function () {
  return gulp.src([
      "source/fonts/**/*.{woff,woff2}",
      "source/img/**",
      "source/js/**"
    ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
});

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "css",
  "sprite",
  "html"
));

gulp.task('server', function () {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/less/**/*.less', gulp.series('css'));
  gulp.watch('source/*.html').on('change', server.reload);
});

gulp.task('start', gulp.series('normalize', 'css', 'server'));
