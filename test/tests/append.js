const flatman = require('flatman-server');
const el = flatman.el;
const Component = flatman.Component;

module.exports = {
  name : '.append()',
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

    a.append([b, c]);
    result.push(a.childNodes.length);
    result.push(a.childNodes.indexOf(b));
    result.push(a.childNodes.indexOf(c));

    return result;
  },
  equal : function () {
    return [ 2, 0, 1 ];
  }
};
