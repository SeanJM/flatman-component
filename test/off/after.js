const flatman = require('flatman-server');
const el = flatman.el;
const Component = flatman.Component;

Component.lib = {};

Component.create('A', {
  constructor() {
    this.test = 'test';
  },
  render() {
    return el('div');
  }
});

let a = el('A', { className : 'a' });
let b = el('A', { className : 'b' });
let c = el('A', { className : 'c' });
let d = el('A', { className : 'd' });

a.append([b, c]);
console.log(b);
b.after(d);


module.exports = {
  name : '.after()',
  this : function () {
    return a.childNodes.indexOf(d);
  },
  equal : function () {
    return 1;
  }
};
