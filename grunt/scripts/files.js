const path = require('path');
const fs = require('fs');
const m = require('match-file-utility');
const config = JSON.parse(fs.readFileSync('grunt.json'));

function notGrunt(file) {
  return !/Gruntfile.js$/.test(file);
}

let src = {
  vendor : m(path.join(config.src, 'scripts', 'vendor'), /\.js$/).filter(notGrunt),
  shared : m(path.join(config.src, 'scripts', 'shared'), /\.js$/).filter(notGrunt),
  constants : m(path.join(config.src, 'scripts', 'constants'), /\.js$/).filter(notGrunt),
  predicates : m(path.join(config.src, 'scripts', 'predicates'), /\.js$/).filter(notGrunt),
  custom : m(path.join(config.src, 'scripts', 'custom'), /\.js$/).filter(notGrunt),
  components : m(path.join(config.src, 'components'), /\.js$/).filter(notGrunt),
  containers : m(path.join(config.src, 'containers'), /\.js$/).filter(notGrunt),
  collections : m(path.join(config.src, 'collections'), /\.js$/).filter(notGrunt),
  main : m(path.join(config.src, 'scripts', 'main'), /\.js$/).filter(notGrunt),
  init : m(path.join(config.src, 'scripts', 'init'), /\.js$/).filter(notGrunt),
  exports : m(path.join(config.src, 'scripts', 'exports'), /\.js$/).filter(notGrunt)
};

let dest = {};

if (config.bundle) {
  dest = {
    bundle : path.join(config.dest, config.bundle)
  };
} else {
  for (var k in src) {
    if (src[k].length) {
      dest[k] = path.join(config.dest, k + '.js');
    }
  }
}

module.exports = {
  src : src,
  dest : dest,

  list : [].concat(
    src.vendor,
    src.shared,
    src.constants,
    src.predicates,
    src.custom,
    src.components,
    src.containers,
    src.collections,
    src.main,
    src.init,
    src.exports
  )
};
