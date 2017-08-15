const flatman = require('flatman-server');
const el = flatman.el;
const Component = require("../../index.js");

module.exports = {
  name : 'Component.onCreate',
  this : function () {
    let result = false;

    Component.onCreate(function (e) {
      if (e.tagName === 'xx.a') {
        result = true;
      }
    });

    Component.create('xx.a', {
      render() {
        return el('div');
      }
    });

    return result;
  },

  isEqual : function () {
    return true;
  }
};
