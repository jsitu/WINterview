var gulp = require('gulp');
    gutil = require('gulp-util'),
    bower = require('bower'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sh = require('shelljs'),
    sourcemaps = require('gulp-sourcemaps'),
    prefix = require('gulp-autoprefixer'),
    inject = require('gulp-inject'),
    tsc = require('gulp-typescript'),
    tslint = require('gulp-tslint');

var Config = require('./gulpfile.config.js'),
    config = new Config();

/**
 * Generates the app.d.ts references file dynamically from all application *.ts files.
 */
gulp.task('gen-ts-refs', function () {
    var target = gulp.src(config.appTypeScriptReferences);
    var sources = gulp.src([config.allTypeScript], {read: false});
    return target.pipe(inject(sources, {
        starttag: '//{',
        endtag: '//}',
        transform: function (filepath) {
            return '/// <reference path="../..' + filepath + '" />';
        }
    })).pipe(gulp.dest(config.typings));
});

/**
 * Lint all custom TypeScript files.
 */
gulp.task('ts-lint', function () {
    return gulp.src(config.allTypeScript).pipe(tslint()).pipe(tslint.report('prose'));
});

/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
gulp.task('compile-ts', function () {
    return gulp.src([config.allTypeScript, config.libraryTypeScriptDefinitions])
      .pipe(tsc({
        noImplicitAny: true,
        out: 'output.js'
      }))
      .pipe(gulp.dest(config.tsOutputPath));
});

gulp.task('default', ['sass', 'build-js', 'watch']);

gulp.task('sass', function() {
  gulp.src(config.allSass)
    .pipe(sass()).on('error', sass.logError)
    .pipe(prefix({browsers: ['last 2 versions'], cascade: false}))
    .pipe(concat('style.css'))
    .pipe(gulp.dest(config.cssOutputPath))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest(config.cssOutputPath));
});

gulp.task('build-js', function() {
  return gulp.src(config.allJavaScript)
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest(config.jsOutputPath))
});

gulp.task('watch', function() {
  gulp.watch(config.allSass, ['sass']);
  gulp.watch(config.allJavaScript, ['build-js']);
  gulp.watch(config.allTypeScript, ['ts-lint', 'compile-ts']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
