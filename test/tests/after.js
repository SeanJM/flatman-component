const flatman = require('flatman-server');
const el = flatman.el;
const Component = flatman.Component;

module.exports = {
  name : '.after()',
  this : function () {
    var a = el('div', { className: 'a' });
    var b = el('div', { className: 'b' });

    Component.lib = {};

    Component.create('a', {
      render() {
        return el('div');
      }
    });

    var c = el('a', [ a ]);
    b.after(a);

    return c.childNodes[1] === b;
  },
  isEqual : function () {
    return true;
  }
};
