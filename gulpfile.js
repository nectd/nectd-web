var gulp = require("gulp");

var sourceDir = "./nectd/source/",
    themeDir = "./theme/nectd-2015/",
    outDir = "./www/assets/";

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

gulp.task("build-js", function() {
    var browserify = require("browserify");
    var babelify = require("babelify");
    var source = require("vinyl-source-stream");
    // var buffer = require("vinyl-buffer");
    // var uglify = require("gulp-uglify");

    return browserify({
            entries: sourceDir + "nectd-app.js",
            debug: true,
            transform: [ babelify ]
        })
        .bundle()
        .pipe(source("nectd-app.js"))
        // .pipe(buffer())
        // .pipe(sourcemaps.init({loadMaps: true}))
        //     .pipe(uglify())
        // .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(outDir + "js"));
});

gulp.task("imagemin", function() {
    var imagemin = require("gulp-imagemin");

    gulp.src(sourceDir + "images/**/*.{jpg,png,gif}")
        .pipe(imagemin())
        .pipe(gulp.dest(outDir + "img"));
});

gulp.task("bolt-js", function() {
    var uglify = require("gulp-uglify");

    gulp.src(themeDir + "**/*.{js,htc}")
        .pipe(rename({ dirname: "" }))
        // .pipe(uglify())
        .pipe(gulp.dest(outDir + "js"));
});

gulp.task("bolt-css", function() {
    var uglify = require("gulp-uglify");

    gulp.src(themeDir + "**/*.css")
        .pipe(rename({ dirname: "" }))
        .pipe(minifyCss())
        .pipe(gulp.dest(outDir + "css"));
});

gulp.task("bolt-img", function() {
    var imagemin = require("gulp-imagemin");

    gulp.src(themeDir + "**/*.{jpg,png,gif}")
        .pipe(rename({ dirname: "" }))
        .pipe(imagemin())
        .pipe(gulp.dest(outDir + "img"));
});

gulp.task("bolt-stuff", [ "bolt-css", "bolt-js", "bolt-img" ], function() {
    gulp.src(themeDir + "old_web/fonts/*")
        .pipe(gulp.dest(outDir + "fonts"));
    gulp.src(themeDir + "web-cards/assets/css/images/*")
        .pipe(gulp.dest(outDir + "css/images"));
});

gulp.task("avatars", function() {
    var imagemin = require("gulp-imagemin");

    gulp.src("nectd/avatars/*.{jpg,png,gif}")
        .pipe(imagemin())
        .pipe(gulp.dest(outDir + "avatars"));
})

var watch = require("gulp-watch");

gulp.task("watch-scss", function() {
    watch(sourceDir + "scss/**/*.scss", function() {
        gulp.start("scss");
    });
});

gulp.task("watch-js", function() {
    watch(sourceDir + "**/*.js", function() {
        gulp.start("build-js");
    });
});

gulp.task("watch-img", function() {
    watch(sourceDir + "images/**/*.{jpg,png,gif}", function() {
        gulp.start("imagemin");
    });
});

gulp.task("watch", [ "watch-scss", "watch-js" ]);

gulp.task("watch-static", function() {
    watch(sourceDir + "scss/**/*.scss", function() {
        gulp.start("static");
    });
});

gulp.task("build", [ "bolt-stuff", "scss", "build-js", "fonts", "avatars", "static" ]);
