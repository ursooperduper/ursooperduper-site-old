var gulp          = require('gulp');
var sourcemaps    = require('gulp-sourcemaps');
var sass          = require('gulp-sass');
var scsslint      = require('gulp-scss-lint');
var autoprefixer  = require('gulp-autoprefixer');
var exec          = require('child_process').exec;
var haml          = require('gulp-ruby-haml');

// Default task
gulp.task('default', ['watch']);

// Haml
gulp.task('haml:index', function() {
  gulp.src('./*.haml')
    .pipe(haml())
    .pipe(gulp.dest('./'));
});

gulp.task('haml:tag', function() {
  gulp.src('tags/_haml/*.haml')
    .pipe(haml())
    .pipe(gulp.dest('tags'));
});

gulp.task('haml:layouts', function() {
  gulp.src('_layouts/_haml/*.haml')
    .pipe(haml())
    .pipe(gulp.dest('_layouts'));
});

gulp.task('haml:includes', function() {
  gulp.src('_includes/_haml/*.haml')
    .pipe(haml())
    .pipe(gulp.dest('_includes'));
});

gulp.task('haml:work', function() {
  gulp.src('work/_haml/*.haml')
    .pipe(haml())
    .pipe(gulp.dest('work'));
});

gulp.task('haml:projects', function() {
  gulp.src('projects/_haml/*.haml')
    .pipe(haml())
    .pipe(gulp.dest('projects'));
});

gulp.task('haml:archive', function() {
  gulp.src('archive/_haml/*.haml')
    .pipe(haml())
    .pipe(gulp.dest('archive'));
});

// Sass
gulp.task('sass', function () {
  gulp.src('css/scss/*.scss')
    .pipe(scsslint({
      'bundleExec': true
    }))
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
  gulp.watch('./*.haml', ['haml:index']);
  gulp.watch('tags/_haml/*.haml', ['haml:tag']);
  gulp.watch('_includes/_haml/*.haml', ['haml:includes']);
  gulp.watch('_layouts/_haml/*.haml', ['haml:layouts']);
  gulp.watch('work/_haml/*.haml', ['haml:work']);
  gulp.watch('projects/_haml/*.haml', ['haml:projects']);
  gulp.watch('archive/_haml/*.haml', ['haml:archive']);
  gulp.watch('css/scss/*.scss', ['sass']);
  gulp.watch('css/*.css', ['autoprefixer']);
});
