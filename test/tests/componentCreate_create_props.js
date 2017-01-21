const flatman = require('flatman-server');
const el = flatman.el;
const Component = flatman.Component;

module.exports = {
  name : 'Create component (check constructor props)',
  this : function () {
    var hasProps;

    Component.create('A', {
      constructor(props) {
        hasProps = props.hasProps;
      }
    });

    el('A', { hasProps : true });
    return hasProps;
  },
  isEqual : function () {
    return true;
  }
};
