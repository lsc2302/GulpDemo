var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var less = require('gulp-less');
var cssClean = require('gulp-clean-css');
var htmlMin = require('gulp-htmlmin');

gulp.task('js',function(){
    return gulp.src('src/js/*.js')
    .pipe(concat('build.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(uglify())
    .pipe(
        rename({
            suffix:'.min'
        })
    )
    .pipe(gulp.dest('dist/js'))
});

gulp.task('less',function(){
    return gulp.src('src/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('dist/css'))
});

gulp.task('css',function(){
    return gulp.src('src/css/*.css')
    .pipe(concat('build.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(cssClean())
    .pipe(rename({
        suffix:'.min'
    }))
    .pipe(gulp.dest('dist/css'))
});

gulp.task('html',function(){
    return gulp.src('src/*.html')
    .pipe(htmlMin(
        {collapseWhiteSpace:true}
    ))
    .pipe(gulp.dest('dist/'))
})

gulp.task('default',gulp.parallel('js','html',gulp.series('less','css')))