const flatman = require('flatman-server');
const el = flatman.el;
const Component = require('../../index');

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
    flatman.Component.lib = Component.lib;
    a = el('y', [ 'loophole' ]);
    return a.childNodes[0] === 'loophole';
  },
  isEqual : function () {
    return true;
  }
};
