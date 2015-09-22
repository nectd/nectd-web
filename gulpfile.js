var gulp = require("gulp");

var themeDir = "theme/nectd-2015/";
var themeOutDir = themeDir + "web-cards/assets/";

var assetMap = {
    "web-cards": "nectd",
    mockup: "mockup"
};

gulp.task("scss", function () {
    var sass = require("gulp-sass");

    gulp.src(themeDir + "scss/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest(themeDir + "assets/css"));
});

gulp.task("fonts", function() {
    gulp.src("node_modules/font-awesome/fonts/*")
        .pipe(gulp.dest(themeDir + "assets/fonts"));
});

var watch = require('gulp-watch');

gulp.task("watch-scss", function() {
    watch(themeDir + "scss/**/*.scss", function() {
        gulp.start("scss");
    });
});
