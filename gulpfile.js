var gulp = require("gulp");

var sourceDir = "./nectd/source/",
    thereDir = "./theme/nectd-2015/",
    outDir = "./web/assets/";

var static = {
    sourceDir : "./nectd/source/",
    outDir : "./static/nectd/assets/"
}

var minifyCss = require("gulp-minify-css");
var sourcemaps = require("gulp-sourcemaps");
var rename = require("gulp-rename");

gulp.task("static", function () {
    var sass = require("gulp-sass");

    gulp.src(static.sourceDir + "scss/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(minifyCss())
        .pipe(gulp.dest(static.outDir + "css"));
});

gulp.task("scss", function () {
    var sass = require("gulp-sass");

    gulp.src(sourceDir + "scss/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(minifyCss())
        .pipe(gulp.dest(outDir + "css"));
});

gulp.task("fonts", function() {
    gulp.src("node_modules/font-awesome/fonts/*")
        .pipe(gulp.dest(outDir + "fonts"));
});

gulp.task("bolt-js", function() {
    var uglify = require("gulp-uglify");

    gulp.src(thereDir + "**/*.{js,htc}")
        .pipe(rename({ dirname: "" }))
        // .pipe(uglify())
        .pipe(gulp.dest(outDir + "js"));
});

gulp.task("bolt-css", function() {
    var uglify = require("gulp-uglify");

    gulp.src(thereDir + "**/*.css")
        .pipe(rename({ dirname: "" }))
        .pipe(minifyCss())
        .pipe(gulp.dest(outDir + "css"));
});

gulp.task("bolt-img", function() {
    var imagemin = require("gulp-imagemin");

    gulp.src(thereDir + "**/*.{jpg,png,gif}")
        .pipe(rename({ dirname: "" }))
        .pipe(imagemin())
        .pipe(gulp.dest(outDir + "img"));
});

gulp.task("bolt-stuff", [ "bolt-css", "bolt-js", "bolt-img" ], function() {
    gulp.src(thereDir + "old_web/fonts/*")
        .pipe(gulp.dest(outDir + "fonts"));
    gulp.src(thereDir + "web-cards/assets/css/images/*")
        .pipe(gulp.dest(outDir + "css/images"));
});

gulp.task("avatars", function() {
    var imagemin = require("gulp-imagemin");

    gulp.src("nectd/avatars/*.{jpg,png,gif}")
        .pipe(imagemin())
        .pipe(gulp.dest("web/avatars/"));
})

var watch = require("gulp-watch");

gulp.task("watch-scss", function() {
    watch(sourceDir + "scss/**/*.scss", function() {
        gulp.start("scss");
    });
});

gulp.task("watch-static", function() {
    watch(sourceDir + "scss/**/*.scss", function() {
        gulp.start("static");
    });
});

gulp.task("build", [ "bolt-stuff", "scss", "fonts", "avatars", "static" ]);
