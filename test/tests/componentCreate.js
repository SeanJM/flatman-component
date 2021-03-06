const flatman = require('flatman-server');
const el = flatman.el;
const Component = require("../../index.js");

module.exports = {
  name : 'Create component',
  this : function () {
    Component.lib = {};

    Component.create('A', {
      constructor() {
        this.test = 'test';
      },
      append(children) {
        this.node.test.append(children);
      },
      smile() {
        return 'smile';
      },
      render() {
        return el('div', [
          el('div', {
            name : 'test'
          })
        ]);
      }
    });

    flatman.Component.lib = Component.lib;

    let a = el('A');

    const isHTML = a.node.document.toString().indexOf('HTML') > -1;
    const hasChildren = Array.isArray(a.children());
    const hasSubscribers = typeof a.subscribers === 'object';
    const hasNodeProperty = typeof a.node === 'object';
    const hasSmile = a.smile() === 'smile';

    return (
      a.test === 'test'
      && hasChildren
      && hasSubscribers
      && hasNodeProperty
      && isHTML
      && hasSmile
    );
  },
  isDeepEqual : function () {
    return true;
  }
};
