const flatman = require('flatman-server');
const el = flatman.el;
const Component = require("../../index.js");

module.exports = {
  name : 'Create component (check constructor props)',
  this : function () {
    var hasProps;
    Component.lib = {};
    Component.create('A', {
      constructor(props) {
        hasProps = props.hasProps;
      }
    });
    flatman.Component.lib = Component.lib;
    el('A', { hasProps : true });
    return hasProps;
  },
  isEqual : function () {
    return true;
  }
};
