const flatman = require('flatman-server');
const el = flatman.el;
const Component = flatman.Component;

module.exports = {
  name : '.append()',
  this : function () {
    var result = [];
    Component.create('C', {
      render() {
        return el('div');
      }
    });

    let a = el('C', { className : 'a' });
    let b = el('C', { className : 'b' });
    let c = el('C', { className : 'c' });

    a.append([b, c]);

    result.push(a.childNodes.length);
    result.push(a.childNodes.indexOf(b));
    result.push(a.childNodes.indexOf(c));

    return result;
  },
  isDeepEqual : function () {
    return [ 2, 0, 1 ];
  }
};
