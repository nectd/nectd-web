var gulp = require("gulp");

var themeDir = "theme/nectd-2015/";
var themeOutDir = themeDir + "web-cards/assets/";

gulp.task("scss", function () {
    var sass = require("gulp-sass");

    gulp.src(themeDir + "scss/nectd.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest(themeOutDir + "css"));
});

gulp.task("fonts", function() {
    gulp.src("node_modules/font-awesome/fonts/*")
        .pipe(gulp.dest(themeOutDir + "fonts"));
});
