const flatman = require('flatman-server');
const el = flatman.el;
const Component = flatman.Component;

module.exports = {
  name : 'Add class',
  this : function () {
    Component.create('A', {
      constructor() {
        this.test = 'test';
      },
      render() {
        return el('div', [
          el('div')
        ]);
      }
    });

    let a = el('A');

    a.addClass('this-class');
    return a.hasClass('this-class');
  },
  equal : function () {
    return true;
  }
};
