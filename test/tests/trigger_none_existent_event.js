const flatman = require('flatman-server');
const el = flatman.el;
const Component = flatman.Component;

module.exports = {
  name : 'trigger() undefined \'on\'',
  this : function () {
    Component.lib = {};
    Component.create('A');
    let a = el('A');
    a.on('click', undefined);
    a.trigger('click');
    return true;
  },
  isEqual : function () {
    return true;
  }
};
