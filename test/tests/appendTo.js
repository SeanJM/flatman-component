const flatman = require('flatman-server');
const el = flatman.el;
const Component = require("../../index.js");

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

    flatman.Component.lib = Component.lib;
    let a = el('D', { className : 'a' });
    let b = el('D', { className : 'b' });
    let c = el('D', { className : 'c' });

    b.appendTo(a);
    c.appendTo(a);
    result.push(a.childNodes.length);
    return result;
  },
  isDeepEqual : function () {
    return [ 2 ];
  }
};
