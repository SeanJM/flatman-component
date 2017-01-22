const flatman = require('flatman-server');
const el = flatman.el;
const Component = flatman.Component;

module.exports = {
  name : 'getNode()',
  this : function () {
    const node = el('div', { className : 'node' });
    Component.lib = {};
    Component.create('A', {
      render() {
        return node;
      }
    });

    Component.create('B', {
      render() {
        return el('A');
      }
    });

    return [ el('A').getNode() === node, el('B').getNode() === node ];
  },
  isDeepEqual : function () {
    return [ true, true ];
  }
};
