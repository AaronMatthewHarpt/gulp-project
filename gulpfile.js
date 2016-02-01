"use strict";

var gulp = require("gulp");
var gulpConcat = require("gulp-concat");
var gulpMinify = require("gulp-uglify");
var sass = require("gulp-sass");
var rename = require("gulp-rename");
var sourcemaps = require("gulp-sourcemaps");		
var clean = require("del");
var autoprefixer = require("gulp-autoprefixer");


gulp.task('concatScripts', function() {
	return gulp.src('src/*.js')	
	  .pipe(sourcemaps.init())
.pipe(gulpConcat('production.js'))
  .pipe(sourcemaps.write("./"))
.pipe(gulp.dest('js'));
});

gulp.task("minifyScripts", ["concatScripts"], function(){
	return gulp.src('js/production.js')
	.pipe(gulpMinify())	
	 .pipe(gulp.dest("js"));		
});

gulp.task("compileSass", function(){
gulp.src("src/main.scss")
.pipe(sourcemaps.init())
.pipe(autoprefixer())
.pipe(sass())		
.pipe(sourcemaps.write("./"))
.pipe(gulp.dest("css"));	
});
		
gulp.task("watch", function(){
	gulp.watch("src/main.scss", ["compileSass"]);
	gulp.watch("js/production.js", ["concatScripts"]);
});

gulp.task("clean", function() {
	clean(["dist", "css/main.css", "js/production.js*", "production/production.min.js"]);
});

 gulp.task("build", [ "concatScripts", "minifyScripts", "compileSass", "watch"], function() {
// 	return gulp.src(["css/main.css", "js/production.js", "index.html", "img/**", "fonts/**"], {base: "./"})
// 	.pipe(gulp.dest("dist"));
 });
	
gulp.task("default",["clean"], function() {
	gulp.start("build");
});