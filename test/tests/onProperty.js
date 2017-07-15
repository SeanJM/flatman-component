const flatman = require('flatman-server');
const el = flatman.el;
const Component = flatman.Component;

module.exports = {
  name : 'trigger() (onClick property)',
  this : function () {
    var isBoolean = false;
    var result = [];
    Component.lib = {};
    Component.create('A', {
      constructor(props) {
        this.on('click', props.onClick);
      }
    });

    let a = el('A', {
      onClick: function () {
        isBoolean = !isBoolean;
      }
    });

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
