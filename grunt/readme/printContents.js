const fs = require('fs');
const path = require('path');
const smartCase = require(path.resolve('grunt/lib/smartCase'));
const config = JSON.parse(fs.readFileSync('grunt.json'));

const _ = require('lodash');
const source = path.join(config.src, 'readme');

function printContents(text, content, i) {
  _.forEach(content, function (value, key) {
    if (typeof value === 'object') {
      text.push(new Array(i + 2).join('#') + ' ' + smartCase(key.replace(/\.md$/, '')));
    }

    if (Array.isArray(value)) {
      value.forEach(function (a) {
        let string = fs.readFileSync(a, 'utf8');
        var base = a.slice(source.length + 1).split(path.sep).map(smartCase).join(' / ');
        text.push(
          new Array(i + 3).join('#') + ' ' + base + ' \([top](#table-of-contents)\)',
          '',
          string
        );
      });
    } else if (typeof value === 'object') {
      printContents(text, value, i + 1);
    } else if (typeof value === 'string') {
      let string = fs.readFileSync(value, 'utf8');
      let name = smartCase(key);
      text.push(
        new Array(i + 2).join('#') + ' ' + name + ' \([top](#table-of-contents)\)',
        '',
        string
      );
    }
  });
}

module.exports = printContents;
