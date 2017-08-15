const flatman = require('flatman-server');
const el = flatman.el;
const Component = require('../../index');

module.exports = {
  name : 'Remove class',
  this : function () {
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

    flatman.Component.lib = Component.lib;

    let a = el('A');

    a.removeClass('shuffle');
    return a.hasClass('shuffle');
  },
  isNotEqual : function () {
    return true;
  }
};
