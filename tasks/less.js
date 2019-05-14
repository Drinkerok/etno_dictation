'use strict';

const gulp = require('gulp');
const combiner = require('stream-combiner2').obj;
const $ = require('gulp-load-plugins')();

module.exports = function(options) {
  return function() {
    return combiner(
      gulp.src(options.src),
      $.less({
        paths: process.cwd(),
      }),
      combiner($.autoprefixer(), $.csso()),
      gulp.dest(options.dest)
    ).on('error', $.notify.onError());
  };
};