const fs = require('fs');
const config = JSON.parse(fs.readFileSync('grunt.json'));

try {
  fs.statSync('src/');
} catch (e) {
  fs.mkdirSync('src/');
  require('./media');
}

require('./readme');
require('./gitignore');
require('./eslintrc');
require('./tests');
require('./scripts');
require('./styles');
require('./flatman');
