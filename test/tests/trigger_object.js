const flatman = require('flatman-server');
const el = flatman.el;
const Component = flatman.Component;

module.exports = {
  name : 'trigger() object',
  this : function () {
    Component.lib = {};
    Component.create('A');
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
