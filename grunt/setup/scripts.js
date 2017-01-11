const path = require('path');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('grunt.json'));

const root = config.src;

try {
  fs.statSync(path.join(root, 'scripts'));
} catch (e) {
  fs.mkdirSync(path.join(root, 'scripts'));

  // Set up the folder structure for sites
  fs.mkdirSync(path.join(root, 'shared/'));

  fs.mkdirSync(root);

  fs.mkdirSync(path.join(root, 'scripts'));
  fs.mkdirSync(path.join(root, 'scripts/constants'));
  fs.mkdirSync(path.join(root, 'scripts/custom'));
  fs.mkdirSync(path.join(root, 'scripts/init'));
  fs.mkdirSync(path.join(root, 'scripts/predicates'));
  fs.mkdirSync(path.join(root, 'scripts/vendor'));
  fs.mkdirSync(path.join(root, 'scripts/exports'));

  fs.mkdirSync(path.join(root, 'components'));
  fs.mkdirSync(path.join(root, 'containers'));
}