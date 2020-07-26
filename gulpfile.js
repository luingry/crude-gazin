"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");

sass.compiler = require("node-sass"); //Necessário para funcionar gulp-sass

gulp.task('default', watch);

gulp.task("sass", compilaSass);

function compilaSass() {
  return gulp
    .src("assets/sass/**/*.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError)) // Converte Sass para CSS mimificado com gulp-sass
    .pipe(gulp.dest("assets/css"));
}

function watch() {
  gulp.watch("assets/sass/**/*.scss", compilaSass);
}