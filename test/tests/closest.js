const flatman = require('flatman-server');
const el = flatman.el;
const Component = flatman.Component;


module.exports = {
  name : '.closest()',
  this : function () {
    Component.lib = {};
    Component.create('A', {
      render(props) {
        return el('div', { className : props.className });
      }
    });

    let a = el('A', { className : 'a' });
    let b = el('A', { className : 'b' });
    let c = el('A', { className : 'c' });

    a.append([ b.append([ c ]) ]);
    return c.closest(a => {
      return a.tagName === 'A';
    }) === b;
  },
  isEqual : function () {
    return true;
  }
};
