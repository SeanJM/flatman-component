const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const m = require('match-file-utility');

const pkg = JSON.parse(fs.readFileSync('package.json'));

const linkLicense = require('./linkLicense');
const smartCase = require(path.resolve('grunt/lib/smartCase'));
const printTests = require('./printTests');
const printTableOfContents = require('./printTableOfContents');
const printContents = require('./printContents');
const config = JSON.parse(fs.readFileSync('grunt.json'));

const source = path.join(config.src, 'readme');

function generate(testResults, callback) {
  let content = {};
  let text = [];
  var hasTests = testResults && testResults.tests.length > 0;
  var total = testResults && testResults.tests.length;
  var passed = testResults && testResults.tests.filter(a => a.passed);
  var failed = testResults && testResults.tests.filter(a => !a.passed);

  m(source, /\.md$/)
    .forEach(function (a) {
      var p = a.substr(source.length).split(path.sep).filter(a => a.length);

      if (p.length) {
        if (typeof _.get(content, p) === 'undefined') {
          _.set(content, p, []);
        } else if (typeof _.get(content, p) === 'string') {
          throw new Error('Invalid folder structure for "' + p.join(path.sep) + '"');
        }
        _.get(content, p).push(a);
      } else {
        content[ p[0].replace(/\.md$/, '') ] = a;
      }
    });


  text.push('# ' + smartCase(pkg.name) + ' ' + pkg.version);

  text.push('#### License: ' + linkLicense(pkg.license || 'MIT'));

  text.push('');

  if (hasTests) {
    if (passed.length === total) {
      text.push('#### ✅ All ' + total + ' tests pass');
    } else {
      text.push('#### 🚫 ' + passed.length + ' of ' + total + ' tests passed (' + Math.round((passed.length / total) * 100) + '%)');
    }
  } else {
    text.push('#### 🐛 No unit tests');
  }

  text.push('', '## Table of Contents');

  text.push('', '#### Overview', '');

  printTableOfContents(text, content, 1);

  if (hasTests) {
    text.push('- [Tests](#tests)');
  }

  text.push('');

  printContents(text, content, 1);

  if (hasTests) {
    printTests(text, testResults);
  }

  fs.writeFileSync('README.md', text.join('\n'));
  callback();
}

module.exports = generate;
