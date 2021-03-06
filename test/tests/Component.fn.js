const flatman = require('flatman-server');
const Component = require("../../index.js");
const el = flatman.el;

module.exports = {
  name : 'Component.fn',
  this : function () {
    let result = false;

    Component.lib = {};

    Component.fn("test", function (e) {
      this.props.test = "test";
      return this;
    });

    Component.create('xx', {
      render() {
        return el('div');
      }
    });

    Component.fn("test2", function (e) {
      this.props.test = "test2";
      return this;
    });

    flatman.Component.lib = Component.lib;
    return [ el("xx").test().props.test, el("xx").test2().props.test ];
  },

  isDeepEqual : function () {
    return [ "test", "test2" ];
  }
};
