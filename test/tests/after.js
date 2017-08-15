const flatman = require('flatman-server');
const el = flatman.el;
const Component = require("../../index.js");

module.exports = {
  name : '.after()',
  this : function () {
    let a = el('div', { className: 'a' });
    let b = el('div', { className: 'b' });

    Component.lib = {};

    Component.create('a', {
      render() {
        return el('div');
      }
    });

    flatman.Component.lib = Component.lib;
    let c = el('a', [ a ]);
    b.after(a);

    return c.childNodes[1] === b;
  },
  isEqual : function () {
    return true;
  }
};
