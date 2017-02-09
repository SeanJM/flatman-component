const flatman = require('flatman-server');
const el = flatman.el;
const Component = flatman.Component;

module.exports = {
  name : '.before()',
  this : function () {
    var result = [];
    Component.lib = {};
    Component.create('E', {
      render() {
        return el('div');
      }
    });

    let a = el('E', { className : 'a' });
    let b = el('E', { className : 'b' });
    let c = el('E', { className : 'c' });
    let d = el('E', { className : 'd' });

    a.append([b, c]);
    c.before(d);

    result.push(a.children().indexOf(b.getNode()));
    result.push(a.children().indexOf(d.getNode()));
    result.push(a.children().indexOf(c.getNode()));

    return result;
  },
  isDeepEqual : function () {
    return [ 0, 1, 2 ];
  }
};
