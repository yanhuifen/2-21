var gulp = require('gulp');
var sass = require('gulp-sass');
var server = require('gulp-webserver');
var url = require('url');
var fs = require('fs');
var path = require('path');
var prodata = require('./data/data.json');
//编译scss
gulp.task('bycss', function() {
        return gulp.src('./src/scss/**/*.scss')
            .pipe(sass())
            .pipe(gulp.dest('./src/css'));
    })
    //监听css
gulp.task('watch', function() {
        return gulp.watch('./src/**/*.scss', gulp.series('bycss'));
    })
    //启服务
gulp.task('startserver', function() {
        return gulp.src('src')
            .pipe(server({
                host: "169.254.55.24",
                port: 8080,
                livereload: true,
                middleware: function(req, res, next) {
                    var pathname = url.parse(req.url).pathname;
                    if (pathname === "/data") {
                        return res.end(JSON.stringify(prodata))
                    } else {
                        pathname = pathname === "/" ? "index.html" : pathname;
                        return res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                    }

                }
            }))
    })
    //默认执行
gulp.task('default', gulp.series('bycss', 'startserver', 'watch'))