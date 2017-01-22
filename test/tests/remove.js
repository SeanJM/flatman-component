const flatman = require('flatman-server');
const el = flatman.el;
const Component = flatman.Component;

module.exports = {
  name : '.remove()',
  this : function () {
    let result = [];
    Component.lib = {};
    Component.create('A', {
      render() {
        return el('div');
      }
    });

    let r = el('A');
    let c = el('A');

    r.append([c]);
    result.push(r.children().length);
    c.remove();
    result.push(r.children().length);

    return result;
  },
  isDeepEqual : function () {
    return [ 1, 0 ];
  }
};
