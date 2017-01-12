const flatman = require('flatman-server');
const el = flatman.el;
const Component = flatman.Component;

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


module.exports = {
  name : 'Remove class',
  this : function () {
    let a = el('A');
    a.removeClass('shuffle');
    return a.hasClass('shuffle');
  },
  notEqual : function () {
    return true;
  }
};
