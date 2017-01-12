const flatman = require('flatman-server');
const el = flatman.el;
const Component = flatman.Component;
const node = el('div');
const path = require('path');
const getNode = require(path.resolve('src/scripts/custom/getNode'));


module.exports = {
  name : 'getNode()',
  this : function () {
    Component.lib = {};

    Component.create('A', {
      constructor() {
        this.test = 'test';
      },
      render() {
        return node;
      }
    });

    return [ getNode(el('A')), getNode(node) ];
  },
  equal : function () {
    return [ node, node ];
  }
};
