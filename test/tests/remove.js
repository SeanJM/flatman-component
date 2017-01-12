const flatman = require('flatman-server');
const el = flatman.el;
const Component = flatman.Component;

Component.create('D', {
  constructor() {
    this.test = 'test';
  },
  render() {
    return el('div');
  }
});

let result = [];

let r = el('D');
let c = el('D');

r.append([c]);
result.push(r.childNodes.length);

c.remove();
result.push(r.childNodes.length);

module.exports = {
  name : '.remove()',
  this : function () {
    return result;
  },
  equal : function () {
    return [ 1, 0 ];
  }
};
