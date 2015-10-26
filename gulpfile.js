var gulp         = require('gulp');
var sourcemaps   = require('gulp-sourcemaps');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var exec         = require('child_process').exec;

// Default task
gulp.task('default', ['watch']);

// Haml
gulp.task('haml', function (cb) {
  exec('rake haml', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});


// Sass
gulp.task('sass', function () {
  gulp.src('css/scss/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('css'));
});


// Autoprefixer
gulp.task('autoprefixer', function () {
    return gulp.src('css/main.css')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('css'));
});


// Watcher
gulp.task('watch', function() {
  gulp.watch('index.haml', ['haml']);
  gulp.watch('_includes/_haml/*.haml', ['haml']);
  gulp.watch('_layouts/_haml/*.haml', ['haml']);
  gulp.watch('work/_haml/*.haml', ['haml']);
  gulp.watch('css/scss/*.scss', ['sass']);
  gulp.watch('css/*.css', ['autoprefixer']);
});
