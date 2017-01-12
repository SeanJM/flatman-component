const flatman = require('flatman-server');
const el = flatman.el;
const Component = flatman.Component;

module.exports = {
  name : '.appendTo()',
  this : function () {
    var result = [];

    Component.create('A', {
      render() {
        return el('div');
      }
    });

    let a = el('A', { className : 'a' });
    let b = el('A', { className : 'b' });
    let c = el('A', { className : 'c' });

    b.appendTo(a);
    c.appendTo(a);
    result.push(a.childNodes.length);
    return result;
  },
  equal : function () {
    return [ 2 ];
  }
};
