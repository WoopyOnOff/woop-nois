var gulp = require('gulp');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');

gulp.task('default', ['minify-js', 'minify-css'], function() {
});

gulp.task('minify-css', function() {
  return gulp.src('dist/assets/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/assets/css'));
});

gulp.task('minify-js', function() {
  return gulp.src(['dist/vendor.bundle.js', 'dist/polyfills.bundle.js', 'dist/main.bundle.js'])
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});
