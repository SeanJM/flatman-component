const flatman = require('flatman-server');
const el = flatman.el;
const Component = require('../../index');

module.exports = {
  name : 'trigger()',
  this : function () {
    var isBoolean = false;
    var result = [];
    Component.lib = {};
    Component.create('A', {
      constructor() {
        this.on('click', () => this.onClick());
      },
      onClick() {
        isBoolean = !isBoolean;
      },
      render() {
        return el('div');
      }
    });

    flatman.Component.lib = Component.lib;

    let a = el('A');

    a.trigger('click');
    result.push(isBoolean);

    a.trigger('click');
    result.push(isBoolean);

    a.trigger('click');
    result.push(isBoolean);

    return result;
  },
  isDeepEqual : function () {
    return [ true, false, true ];
  }
};
