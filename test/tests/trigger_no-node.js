const flatman = require('flatman-server');
const el = flatman.el;
const Component = flatman.Component;

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

    o = el('o');
    o.onCreate();
    return isCreated;
  },
  isEqual : function () {
    return true;
  }
};
