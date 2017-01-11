const path = require('path');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('grunt.json'));

if (config.isSite) {
  try {
    fs.statSync(path.join(config.src, 'styles'));
  } catch (e) {
    fs.mkdirSync(path.join(config.src, 'styles'));
    fs.mkdirSync(path.join(config.src, 'styles/constants'));
    fs.mkdirSync(path.join(config.src, 'styles/custom'));
    fs.mkdirSync(path.join(config.src, 'styles/functions'));
    fs.mkdirSync(path.join(config.src, 'styles/placeholders'));
    fs.mkdirSync(path.join(config.src, 'styles/vendor'));
  }
}
