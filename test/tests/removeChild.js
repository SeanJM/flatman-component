const flatman = require('flatman-server');
const el = flatman.el;
const Component = require("../../index.js");

module.exports = {
  name : '.removeChild()',
  this : function () {
    Component.lib = {};
    Component.create('A', {
      constructor() {
        this.test = 'test';
      },
      render() {
        return el('div');
      }
    });

    flatman.Component.lib = Component.lib;

    let result = [];

    let r = el('A');
    let c = el('A');

    r.append([c]);
    result.push(r.childNodes.length);

    r.removeChild([c]);
    result.push(r.childNodes.length);

    return result;
  },
  isDeepEqual : function () {
    return [ 1, 0 ];
  }
};
