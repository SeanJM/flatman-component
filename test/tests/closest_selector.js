const flatman = require('flatman-server');
const el = flatman.el;
const Component = flatman.Component;

let a;
let b;
let c;

module.exports = {
  name : '.closest() (string selector)',
  this : function () {
    Component.create('A', {
      render() {
        return el('div');
      }
    });

    a = el('A', { className : 'a' });
    b = el('A', { className : 'b' });
    c = el('A', { className : 'c' });

    a.append([ b.append([ c ]) ]);

    return c.closest('.a');
  },
  isEqual : function () {
    return a.node.document;
  }
};
