const flatman = require('flatman-server');
const el = flatman.el;
const Component = flatman.Component;

let a;
let b;
let c;

module.exports = {
  name : '.closest() (predicate)',
  this : function () {
    Component.lib = {};
    Component.create('A', {
      render(props) {
        return el('div', { className : props.className });
      }
    });

    a = el('A', { className : 'a' });
    b = el('A', { className : 'b' });
    c = el('A', { className : 'c' });

    a.append([ b.append([ c ]) ]);

    return c.closest(n => n.tagName === 'A') === b;
  },
  isEqual : function () {
    return true;
  }
};
