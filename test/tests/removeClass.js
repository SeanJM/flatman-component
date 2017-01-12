const flatman = require('flatman-server');
const el = flatman.el;
const Component = flatman.Component;

Component.lib = {};

Component.create('A', {
  constructor() {
    this.test = 'test';
  },
  render() {
    return el('div', { className : 'shuffle' }, [
      el('div')
    ]);
  }
});

let a = el('A');

module.exports = {
  name : 'Remove class',
  this : function () {
    a.removeClass('shuffle');
    console.log(a);
    return a.hasClass('shuffle');
  },
  notEqual : function () {
    return true;
  }
};
