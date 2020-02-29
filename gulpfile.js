var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var gulp = require('gulp');
var sass = require('gulp-sass');
sass.compiler = require('node-sass');

// sass in src folder and compile to dist
gulp.task('sass', function () {
  return gulp.src('./src/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist'));
});

// Look for sass
gulp.task('sass:watch', function () {
  gulp.watch('./src/*.scss', gulp.series('sass'));
});


// Static server
gulp.task('browser-sync', function() {
	browserSync.init({
			server: {
					baseDir: "./"
			}
	});
});

gulp.task('default', gulp.parallel('sass:watch', 'browser-sync'));
