var gulp         = require('gulp');
var sourcemaps   = require('gulp-sourcemaps');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var exec         = require('child_process').exec;


// Default task
gulp.task('default', ['watch']);

// Haml
gulp.task('haml:index', function (cb) {
  exec('rake haml:index', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('haml:tag', function (cb) {
  exec('rake haml:tag', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('haml:layouts', function (cb) {
  exec('rake haml:layouts', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('haml:includes', function (cb) {
  exec('rake haml:includes', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('haml:work', function (cb) {
  exec('rake haml:work', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('haml:archive', function (cb) {
  exec('rake haml:archive', function (err, stdout, stderr) {
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
  gulp.watch('index.haml', ['haml:index']);
  gulp.watch('tags/_haml/*.haml', ['haml:tag']);
  gulp.watch('_includes/_haml/*.haml', ['haml:includes']);
  gulp.watch('_layouts/_haml/*.haml', ['haml:layouts']);
  gulp.watch('work/_haml/*.haml', ['haml:work']);
  gulp.watch('archive/_haml/*.haml', ['haml:archive']);
  gulp.watch('css/scss/*.scss', ['sass']);
  gulp.watch('css/*.css', ['autoprefixer']);
});
