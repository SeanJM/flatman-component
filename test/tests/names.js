const flatman = require('flatman-server');
const el = flatman.el;
const Component = flatman.Component;

module.exports = {
  name : 'names()',
  this : function () {
    var isBoolean = false;

    Component.lib.A = undefined;

    Component.create('A', {
      constructor() {
        this.on('click', () => this.onClick());
      },

      hasName() {
        isBoolean = !!(this.names && this.names.divi);
      },

      render() {
        return el('div', [
          el('div', { name: 'divi' })
        ]);
      }
    });

    let a = el('A');
    a.hasName();

    return isBoolean;
  },
  isEqual : function () {
    return true;
  }
};