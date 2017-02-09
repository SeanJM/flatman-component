const flatman = require('flatman-server');
const el = flatman.el;
const Component = flatman.Component;

module.exports = {
  name : 'Component.find',
  this : function () {
    Component.create('x.a', {
      render() {
        return el('div');
      }
    });

    Component.create('x.b', {
      render() {
        return el('div');
      }
    });

    Component.create('y.b', {
      render() {
        return el('div');
      }
    });

    Component.create('x.c', {
      render() {
        return el('div');
      }
    });

    return Component.find(/x/).length;
  },
  isEqual : function () {
    return 3;
  }
};
