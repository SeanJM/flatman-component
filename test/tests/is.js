const flatman = require('flatman-server');
const el = flatman.el;
const Component = require('../../index');

module.exports = {
  name : '.is()',
  this : function () {
    Component.lib = {};
    Component.create('A', {
      render() {
        return el('div', { className : 'this' });
      }
    });
    flatman.Component.lib = Component.lib;
    return el('A').is('A');
  },
  isEqual : function () {
    return true;
  }
};
