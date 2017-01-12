const flatman = require('flatman-server');
const el = flatman.el;
const Component = flatman.Component;
const node = el('div');
const path = require('path');
const getNode = require(path.resolve('src/scripts/custom/getNode'));


module.exports = {
  name : 'getNode()',
  this : function () {
    Component.create('A', {
      constructor() {
        this.test = 'test';
      },
      render() {
        return node;
      }
    });

    Component.create('B', {
      render() {
        return el('A');
      }
    });

    return [ getNode(el('A')), getNode(node), getNode(el('B')) ];
  },
  equal : function () {
    return [ node, node, node ];
  }
};
