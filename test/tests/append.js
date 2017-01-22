const flatman = require('flatman-server');
const el = flatman.el;
const Component = flatman.Component;

module.exports = {
  name : '.append()',
  this : function () {
    var result = [];
    Component.lib = {};
    Component.create('A', {
      render() {
        return el('div');
      }
    });

    let a = el('A', { className : 'a' });
    let b = el('A', { className : 'b' });
    let c = el('A', { className : 'c' });

    a.append([b, c]);
    result.push(a.children().length);
    result.push(a.children().indexOf(b.getNode()));
    result.push(a.children().indexOf(c.getNode()));

    return result;
  },
  isDeepEqual : function () {
    return [ 2, 0, 1 ];
  }
};
