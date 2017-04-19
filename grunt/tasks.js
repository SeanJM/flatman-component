const fs = require('fs');
const scripts = require('./scripts');
const config = JSON.parse(fs.readFileSync('grunt.json'));

let tasks = [];

if (scripts.list.length) {
  if (config.isProduction) {
    tasks.push('uglify');
  } else {
    tasks.push('concat');
  }
}

tasks.push(
  'readme',
  'flatman'
);

if (!config.isProduction) {
  tasks.push('watch');
}

module.exports = tasks;
