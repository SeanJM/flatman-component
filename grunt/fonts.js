const fs = require('fs');
const path = require('path');
const m = require('match-file-utility');
const _ = require('lodash');
const config = JSON.parse(fs.readFileSync('grunt.json'));

const files = m(path.join(config.src, 'application', 'fonts'), /(eot|svg|ttf|woff|woff2)$/);

let dest = _(files)
  .groupBy(a => path.join(config.dest, path.basename(a)))
  .mapValues(a => a[0])
  .valueOf();

module.exports = {
  dest : dest,
  files : files
};
