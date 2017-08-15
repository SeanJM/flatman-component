const flatman = require('flatman-server');
const el = flatman.el;
const Component = require('../../index');

module.exports = {
  name : 'trigger() undefined \'on\'',
  this : function () {
    Component.lib = {};
    Component.create('A');
    flatman.Component.lib = Component.lib;
    let a = el('A');
    a.on('click', undefined);
    a.trigger('click');
    return true;
  },
  isEqual : function () {
    return true;
  }
};
