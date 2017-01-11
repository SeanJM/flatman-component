const _ = require('lodash');
const m = require('match-file-utility');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('grunt.json'));

const images = require('./images');

const imageFiles = Object.keys(images.dest);
const cssFiles = require('./css').files.dest;
const scripts = _.map(require('./scripts').dest, a => a);
const fonts = Object.keys(require('./fonts').dest);

module.exports = {
  task : function (callback) {
    m(config.dest, /\.css$/).forEach(function (f) {
      if (cssFiles !== f) {
        fs.unlink(f);
      }
    });

    m(config.dest, /\.css\.map$/).forEach(function (f) {
      if (cssFiles + '.map' !== f) {
        fs.unlink(f);
      }
    });

    m(config.dest, /\.(png|svg|jpg)$/).forEach(function (f) {
      var lowres = f.replace(/.lowres/, '');
      if (
        imageFiles.indexOf(f) === -1
        && imageFiles.indexOf(lowres) === -1
        && fonts.indexOf(f) === -1
      ) {
        fs.unlink(f);
      }
    });

    m(config.dest, /\.js$/).forEach(function (f) {
      if (scripts.indexOf(f) === -1) {
        fs.unlink(f);
      }
    });

    m(config.dest, /\.(js\.map)$/).forEach(function (f) {
      if (scripts.indexOf(f.slice(0, -4)) === -1) {
        fs.unlink(f);
      }
    });

    callback();
  }
};
