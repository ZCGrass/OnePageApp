var replace = require('gulp-replace');
var gulp = require('gulp');

gulp.task('replace', function () {
  gulp.src('./dist/*/*.html')
    .pipe(replace('<script src="../vendor.dll.js"></script>', ''))
    .pipe(gulp.dest('./dist'));
});

gulp.task('css-replace', function () {
  gulp.src('./dist/assets/*/*/*.css')
    .pipe(replace('https://at.alicdn.com/t/', '../../common/fonts/'))
    .pipe(gulp.dest('./dist/assets'));
});
gulp.task('default', ['replace', 'css-replace'], function () {
});
