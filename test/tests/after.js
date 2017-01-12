const flatman = require('flatman-server');
const el = flatman.el;
const Component = flatman.Component;

module.exports = {
  name : '.after()',
  this : function () {
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
    b.after(d);
    
    return [
      a.childNodes.indexOf(b),
      a.childNodes.indexOf(d),
      a.childNodes.indexOf(c)
    ];
  },
  equal : function () {
    return [ 0, 1, 2 ];
  }
};
