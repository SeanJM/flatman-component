const flatman = require('flatman-server');
const el = flatman.el;
const Component = require('../../index');

module.exports = {
  name : '.remove()',
  this : function () {
    let result = [];
    Component.lib = {};
    Component.create('A', {
      render() {
        return el('div');
      }
    });

    flatman.Component.lib = Component.lib;

    let r = el('A');
    let c = el('A');

    r.append([c]);
    result.push(r.childNodes.length);
    c.remove();
    result.push(r.childNodes.length);

    return result;
  },
  isDeepEqual : function () {
    return [ 1, 0 ];
  }
};
