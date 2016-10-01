const m = require('match-file-utility');
const fs = require('fs');
const scripts = require('./scripts');
const css = require('./css');

let files = m('src/flatman/', /\.js$/);

module.exports = {
  glob : [
    'src/flatman/**/*.js',
    'src/flatman/**/*.txt',
    'src/flatman/**/*.md'
  ],

  files : files,

  task : function (callback) {
    const pages = m('src/flatman/pages', /\.js$/).map(a => '../' + a);

    try {
      pages.forEach(function (file) {
        var page = require(file);

        if (typeof page === 'undefined') {
          console.log('Cannot generate: \'' + file + '\', is it using \'module.exports\'?');
        }

        for (var k in scripts.dest) {
          try {
            fs.statSync(scripts.dest[k]);
            page.script(scripts.dest[k]);
          } catch (e) {}
        }

        try {
          fs.statSync(css.files.dest);
          page.css(css.files.dest);
        } catch (e) {}

        page.write();
      });
    } catch(e) {
      console.log('flatman error: ' + e);
    }
    
    callback();
  }
};
