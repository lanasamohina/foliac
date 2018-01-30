var gulp = require('gulp');
var less = require('gulp-less');
var font2css = require('gulp-font2css');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var cleanCss = require('gulp-clean-css');
var browserSync = require('browser-sync').create();

var config = {
    paths: {
        less: './public_html/less/**/*.less',
        html: './public_html/index.html'
    },
    output: {
        cssName: 'css/main.css',
        path: './public_html/'
    }
};

gulp.task('less', function(){
    return gulp.src(config.paths.less)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(concat(config.output.cssName))
        .pipe(autoprefixer())
        //.pipe(cleanCss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.output.path))
       // .pipe(browserSync.stream());
});
gulp.task('fonts', function() {
    return gulp.src('fonts/**/*.{otf,ttf,woff,woff2}')
        .pipe(font2css())
        .pipe(concat('fonts.css'))
        .pipe(gulp.dest(config.output.path))
});

gulp.task('serve', function(){
   /* browserSync.init({
        server: {
            baseDir: config.output.path
        }
    });*/
    gulp.watch(config.paths.less, ['less']);
  //  gulp.watch(config.paths.html).on('change', browserSync.reload);
});

gulp.task('default', ['less', 'serve']);