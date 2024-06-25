const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const watch = require('gulp-watch');

// Задача для компиляции SCSS в CSS
gulp.task('sass', function() {
    return gulp.src('scss/**/*.scss') // Источник SCSS файлов
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('style')); // Папка назначения для CSS файлов
});

// Задача для наблюдения за изменениями в SCSS файлах
gulp.task('watch', function() {
    gulp.watch('scss/**/*.scss', gulp.series('sass'));
});

// Задача по умолчанию, запускающая компиляцию и наблюдение
gulp.task('default', gulp.series('sass', 'watch'));