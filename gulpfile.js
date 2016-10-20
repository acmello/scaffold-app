'use strict';

var gulp        = require('gulp');
var sass        = require('gulp-sass');
var uglify      = require('gulp-uglify');
var concat      = require('gulp-concat');
var rename      = require('gulp-rename');
var browserSync = require('browser-sync').create();
var del         = require('del');

gulp.task('default', ['build']);

gulp.task('build', [
    'watch',
    'clean',
    'images',
    'data',
    'vendors',
    'template',
    'compress',
    'stylesheets',
    'server'
]);

// Static Server + watching scss/html files
gulp.task('server', ['template', 'stylesheets', 'compress'], function() {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch("src/scss/**/*.scss", ['stylesheets']);
    gulp.watch(["src/components/**/*.js", 'src/index.js'], ['compress']);

    gulp.watch("dist/public/*.html").on('change', browserSync.reload);
    gulp.watch("dist/public/js/*.js").on('change', browserSync.reload);
    gulp.watch("dist/public/stylesheet/*.css").on('change', browserSync.reload);
});

gulp.task('compress', function() {
    return gulp.src(['./src/components/**/*.js','./src/app.js'])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist/public/js'))
        .pipe(browserSync.stream());
});

gulp.task('vendors', function() {
    return gulp.src('./src/vendors/**/*')
        .pipe(gulp.dest('./dist/public/vendors'));
});

gulp.task('images', function() {
    return gulp.src('./src/assets/**/*')
        .pipe(gulp.dest('./dist/public/assets'));
})

gulp.task('stylesheets', function() {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/public/stylesheet'))
        .pipe(browserSync.stream());
});

gulp.task('template', function() {
    return gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());
});

gulp.task('clean', function() {
    return del.sync(['./dist/**']);
});

gulp.task('data', function() {
  return gulp.src('./src/**/*.json')
        .pipe(gulp.dest('./dist'))
})

gulp.task('watch', function() {
    gulp.watch('./src/**/*.html', ['template']);
    gulp.watch('./src/js/**/*.js', ['compress']);
    gulp.watch('./src/scss/*/*.scss', ['stylesheets']);
});



