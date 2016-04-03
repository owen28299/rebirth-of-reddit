var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

//static server + watches scss/html files
gulp.task('serve',['sass'], function(){

  browserSync.init({
    server: "./public"
  });

  gulp.watch("scss/**/*.scss", ['sass']);
  gulp.watch("public/*.html").on('change', browserSync.reload);

});

//compiles sass into css and auto-injects css into browser
gulp.task('sass', function(){
  return gulp.src("scss/styles.scss")
    .pipe(sass())
    .pipe(gulp.dest("public/css"))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);