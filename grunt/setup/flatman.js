const path = require('path');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('grunt.json'));

if (config.isSite) {
  try {
    fs.statSync(path.join(config.src, 'flatman'));
  } catch (e) {
    fs.mkdirSync(path.join(config.src, 'flatman'));
    fs.mkdirSync(path.join(config.src, 'flatman', 'pages'));
    fs.mkdirSync(path.join(config.src, 'flatman', 'components'));
    fs.mkdirSync(path.join(config.src, 'flatman', 'content'));

    fs.writeFileSync(path.join(config.src, 'flatman', 'pages', 'index.js'),
      fs.readFileSync(path.join('grunt', 'boilerplate', 'flatman', 'index.js'), 'utf8')
    );
  }
}
