const flatman = require('flatman-server');
const el = flatman.el;
const Component = require('../../index');

let isCreated = false;

Component.lib = {};


module.exports = {
  name : 'trigger() no node',
  this : function () {
    let o;

    Component.create('o', {
      onCreate() {
        isCreated = true;
      }
    });
    flatman.Component.lib = Component.lib;
    o = el('o');
    o.onCreate();
    return isCreated;
  },
  isEqual : function () {
    return true;
  }
};
