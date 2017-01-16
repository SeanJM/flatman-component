const flatman = require('flatman-server');
const el = flatman.el;
const Component = flatman.Component;

module.exports = {
  name : 'Remove class',
  this : function () {
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

    a.removeClass('shuffle');
    return a.hasClass('shuffle');
  },
  isNotEqual : function () {
    return true;
  }
};
