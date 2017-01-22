const flatman = require('flatman-server');
const el = flatman.el;
const Component = flatman.Component;

module.exports = {
  name : '.is()',
  this : function () {
    Component.lib = {};
    Component.create('A', {
      render() {
        return el('div', { className : 'this' });
      }
    });

    return el('A').is('.this');
  },
  isEqual : function () {
    return true;
  }
};
