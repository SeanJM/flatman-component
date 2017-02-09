const flatman = require('flatman-server');
const el = flatman.el;
const Component = flatman.Component;

module.exports = {
  name : '.appendTo()',
  this : function () {
    var result = [];
    Component.lib = {};
    Component.create('D', {
      render() {
        return el('div');
      }
    });

    let a = el('D', { className : 'a' });
    let b = el('D', { className : 'b' });
    let c = el('D', { className : 'c' });

    b.appendTo(a);
    c.appendTo(a);
    result.push(a.children().length);
    return result;
  },
  isDeepEqual : function () {
    return [ 2 ];
  }
};
