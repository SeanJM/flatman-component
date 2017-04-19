const flatman = require('./grunt/flatman');
const tasks = require('./grunt/tasks');
const initConfig = require('./grunt/initConfig');
const readme = require('./grunt/readme');

require('./grunt/setup');

module.exports = function(grunt) {
  // Project configuration.
  initConfig.pkg = grunt.file.readJSON('package.json');
  grunt.initConfig(initConfig);

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', tasks);

  grunt.registerTask('flatman', function () {
    flatman.task(this.async());
  });

  grunt.registerTask('readme', function () {
    readme.task(this.async());
  });
};
