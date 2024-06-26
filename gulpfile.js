const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const watch = require("gulp-watch");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const htmlmin = require("gulp-htmlmin");
const rename = require("gulp-rename");

gulp.task("sass", function () {
  return gulp
    .src("scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("dist/style"));
});

gulp.task("minify-js", function () {
  return gulp
    .src("js/**/*.js")
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("dist/js"));
});

gulp.task("minify-html", function () {
  return gulp
    .src("*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("dist"));
});

gulp.task("watch", function () {
  gulp.watch("scss/**/*.scss", gulp.series("sass"));
  gulp.watch("js/**/*.js", gulp.series("minify-js"));
  gulp.watch("*.html", gulp.series("minify-html"));
});

gulp.task("default", gulp.series("sass", "minify-js", "minify-html", "watch"));
