/**
 *      Created by xiaofeng.yao
 *      gulp 配置文件
 */
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(), // gulp控制,自动刷新的服务器
    reload = browserSync.reload,
    notify = require('gulp-notify'), // 发生错误时的错误提示
    sourcemaps = require('gulp-sourcemaps'), // 为文件添加sourcemaps
    plumber = require('gulp-plumber'), // 发生错误时不停止任务
    runSequence = require('run-sequence'), // 使任务按序执行
    rename = require('gulp-rename'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    proxy = require('proxy-middleware'),
    url = require('url'),
    PATH, browsers = ['last 4 versions', 'android >= 4', 'ie >= 9'];

PATH = {
    'appRoot': 'app/',
    'less': 'app/less/',
    'sass': 'app/scss/',
    'sass_components': 'app/components/',
    'css': 'app/css/',
    'reload': [ // 这个目录和less目录下的内容变化时会刷新游览器
        'app/**/*.js',
        'app/**/*.html',
        'app/config/**/*/.json',
        '!app/asset/**/*' // 排除asset 目录
    ]
};

// start browserSync server
gulp.task('browserSync', function () {

    browserSync.init({
        'injectChanges': true, // 新增文件
        'open': true,
        'server': {
            'baseDir': PATH.appRoot,
            'index': 'index.html',
        }, // 服务器模式
        'port': '3000',
        'ui': {
            'port': 3001
        }
    });

});

// 打包scss目录下的样式文件
gulp.task('sass', function () {
    console.log('sass编译中');
    return gulp.src(PATH.sass + 'theme.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber({
            'errorHandler': notify.onError('Error: <%= error.message %>')
        }))
        .pipe(sass({
            'outputStyle': 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            'browsers': browsers
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(PATH.css))
        .pipe(reload({
            'stream': true
        }));
});

// 打包组件里的scss文件
gulp.task('sass_components', function () {
    console.log('sass_components');
    return gulp.src(PATH.sass_components + 'module/**/*.scss', {
            'base': './'
        })
        .pipe(sourcemaps.init())
        .pipe(plumber({
            'errorHandler': notify.onError('Error: <%= error.message %>')
        }))
        .pipe(sass({
            'outputStyle': 'compressed'
        }).on('error', sass.logError))
        .pipe(sourcemaps.write({
            'includeContent': false
        })) // 重置sourcemap的源位置
        .pipe(sourcemaps.init({
            'loadMaps': true
        }))
        .pipe(autoprefixer({
            'browsers': browsers
        }))
        .pipe(rename(function (path) {
            path.dirname += '/css';
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('.'))
        .pipe(reload({
            'stream': true
        }));
});

gulp.task('watch', function () {
    gulp.watch([
        PATH.sass + '**/*.scss',
    ], ['sass']); // 监听sass变化
    gulp.watch([PATH.sass_components + 'module/**/*.scss'], ['sass_components']); // 监听组件sass变化
    gulp.watch(PATH.reload, function () { // 保存刷新
        console.log('浏览器刷新中');
        reload();
    });
});

gulp.task('default', function (callback) {
    runSequence(['browserSync', 'sass', 'sass_components', 'watch'], callback); // 默认的开发任务，编译css
});