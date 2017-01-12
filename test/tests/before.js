const flatman = require('flatman-server');
const el = flatman.el;
const Component = flatman.Component;

module.exports = {
  name : '.before()',
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
    let d = el('A', { className : 'd' });

    a.append([b, c]);
    c.before(d);

    result.push(a.childNodes.indexOf(b));
    result.push(a.childNodes.indexOf(d));
    result.push(a.childNodes.indexOf(c));

    return result;
  },
  equal : function () {
    return [ 0, 1, 2 ];
  }
};
