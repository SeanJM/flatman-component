const Component = require('../../bin/Component');

module.exports = {
  name : 'Create component (has return value)',
  this : function () {
    var s = Component.create('A');
    return typeof s === 'undefined';
  },
  isEqual : function () {
    return false;
  }
};
