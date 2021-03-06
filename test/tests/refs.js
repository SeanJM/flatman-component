const flatman = require('flatman-server');
const el = flatman.el;
const Component = require('../../index');

module.exports = {
  name : 'refs',
  this : function () {
    var isBoolean = false;

    Component.lib.A = undefined;

    Component.create('A', {
      constructor() {
        this.on('click', () => this.onClick());
      },

      hasRef() {
        isBoolean = !!(this.refs && this.refs.divi && this.refs.divi2);
      },

      render() {
        return el('div', [
          el('div', { ref: 'divi' }, [
            el("div", { ref: "divi2" })
          ])
        ]);
      }
    });

    flatman.Component.lib = Component.lib;
    let a = el('A');
    a.hasRef();

    return isBoolean;
  },
  isEqual : function () {
    return true;
  }
};
