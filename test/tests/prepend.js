const flatman = require('flatman-server');
const el = flatman.el;
const Component = require("../../index.js");

module.exports = {
  name : '.prepend()',
  this : function () {
    var result = [];

    var b = el("div", { className: "b" });
    var c = el("div", { className: "c" });

    Component.lib = {};

    Component.create('C', {
      render() {
        return el('div');
      }
    });

    flatman.Component.lib = Component.lib;
    let a = el('C');

    a.append([c]);
    a.prepend([b]);

    return a.childNodes[0] === b;
  },
  isEqual : function () {
    return true;
  }
};
