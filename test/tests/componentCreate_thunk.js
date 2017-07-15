const flatman = require('flatman-server');
const el = flatman.el;
const Component = flatman.Component;

module.exports = {
  name : 'Create component thunk',
  this : function () {
    const a = el('div');
    let b;

    Component.function = {};

    Component.create('Z', () => {
      return a;
    });

    b = el('Z');

    return b === a;
  },
  isDeepEqual : function () {
    return true;
  }
};
