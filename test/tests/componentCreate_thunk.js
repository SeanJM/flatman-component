const flatman = require('flatman-server');
const el = flatman.el;
const Component = flatman.Component;

module.exports = {
  name : 'Create component thunk',
  this : function () {
    const a = el('div');
    Component.lib = {};
    Component.create('Z', props => {
      return a.attr(props);
    });

    let b = el('Z', { className : 'test' });

    return b === a;
  },
  isDeepEqual : function () {
    return true;
  }
};
