const flatman = require('flatman-server');
const el = flatman.el;
const Component = require('../../index');

module.exports = {
  name : 'trigger() object',
  this : function () {
    Component.lib = {};
    Component.create('A');
    flatman.Component.lib = Component.lib;
    let a = el('A');
    let result = false;

    function e() {
      this.type = 'click';
    }

    a.on('click', function () {
      result = true;
    });

    a.trigger(new e());

    return result;
  },
  isEqual : function () {
    return true;
  }
};
