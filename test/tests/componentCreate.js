const flatman = require('flatman-server');
const el = flatman.el;
const Component = flatman.Component;

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

let a = el('A');

module.exports = {
  name : 'Create component',
  this : function () {
    const isHTML = a.node.document.toString().indexOf('HTML') > -1;
    const hasChildren = Array.isArray(a.childNodes);
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
  equal : function () {
    return true;
  }
};