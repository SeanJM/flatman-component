const flatman = require('flatman-server');
const el = flatman.el;
const Component = flatman.Component;

Component.create('A', {
  constructor() {
    this.test = 'test';
  },
  render() {
    return el('div', [
      el('div', {
        name : 'test'
      })
    ]);
  }
});

let r = el('A');
let c = el('A');

r.append([c]);

module.exports = {
  name : 'Parent Node',
  this : function () {
    return c.parentNode === r.node.document;
  },
  equal : function () {
    return true;
  }
};
