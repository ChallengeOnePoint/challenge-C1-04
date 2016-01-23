'use strict';

var gulp       = require('gulp');
var browserify = require('browserify');
var watchify   = require('watchify');
var fs         = require('fs');

gulp.task('default', ['app', 'vendor']);

gulp.task('public', function (cb) {
  fs.mkdir('./public', function () { cb(); });
});

gulp.task('app', ['public', 'assets'], function () {
  return bundle(createBundler());
});

gulp.task('assets', function() {
  gulp.src('./client/app.css')
    .pipe(gulp.dest('./public/'));
});

gulp.task('vendor', ['vendor:js']);

gulp.task('vendor:js', ['public'], function () {
  return browserify()
    .require('angular')
    .require('angular-animate')
    .require('angular-resource')
    .require('angular-sanitize')
    .require('angular-ui-router')
    .require('angular-translate')
    .require('mixpanel-browser')
    .bundle()
    .pipe(fs.createWriteStream('./public/vendor.js'));
});

gulp.task('watch', ['public', 'vendor', 'assets'], function () {
  var bundler = createBundler({ cache: {}, packageCache: {} })
    .plugin('errorify')
    .plugin('watchify', { ignoreWatch: true });

  bundler.on('update', function () { bundle(bundler); });
  bundler.on('log', function (msg) { console.log(msg); });

  return bundle(bundler);
});

function createBundler (options) {
  var path = require.resolve('./client/app.js');

  return browserify(path, options)
    .external('angular')
    .external('angular-animate')
    .external('angular-moment')
    .external('angular-resource')
    .external('angular-sanitize')
    .external('angular-ui-router')
    .external('angular-translate')
    .external('mixpanel-browser')
    .transform('babelify', { presets: ['es2015', 'stage-2'] })
    .transform('browserify-ngannotate')
    .on('error', function (err) { console.error(err.stack); });
}

function bundle (bundler) {
  return bundler
    .bundle()
    .pipe(fs.createWriteStream('./public/application.js'));
}
