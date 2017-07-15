const flatman = require('flatman-server');
const el = flatman.el;
const Component = flatman.Component;

module.exports = {
  name : 'Component has text as child',
  this : function () {
    let a;

    Component.lib = {};
    Component.create('y', {
      render() {
        return el('div');
      }
    });

    a = el('y', [ 'loophole' ]);
    return a.childNodes[0] === 'loophole';
  },
  isEqual : function () {
    return true;
  }
};
