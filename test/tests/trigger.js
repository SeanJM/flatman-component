const flatman = require('flatman-server');
const el = flatman.el;
const Component = flatman.Component;

module.exports = {
  name : 'trigger()',
  this : function () {
    var isBoolean = false;
    var result = [];

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
