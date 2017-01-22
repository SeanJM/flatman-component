const Component = require('../../index');

module.exports = {
  name : 'Create component (has return value)',
  this : function () {
    Component.lib = {};
    var s = Component.create('A');
    return typeof s === 'undefined';
  },
  isEqual : function () {
    return false;
  }
};
