'use strict';

var gulp = require('gulp');
// paths config
var config = require('./config.json');
// SASS
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
// JAVASCRIPT
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
// IMAGE OPTIMIZATION
// var imagemin = require('gulp-imagemin');

gulp.task('sass', function () {
    gulp.src(config.base + config.scss.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(rename('main.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.scss.dest))
});


gulp.task('js', function () {
    return gulp.src(config.base + config.js.src)
        .pipe(concat('Main.js'))
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.js.dest))
});


// gulp.task('images', function () {
//     return gulp.src('./src/img/**/*.+(png|jpg|jpeg|gif|svg)')
//         .pipe(imagemin())
//         .pipe(gulp.dest('dist/assets/img'))
// });


gulp.task('default', ['sass', 'js']);

gulp.task('watch', function () {
    gulp.watch(config.base + config.css.src, ['sass']);
    gulp.watch(config.base + config.js.src, ['js']);
//  gulp.watch('./src/img/**/*.+(png|jpg|jpeg|gif|svg)', ['images']);
});




