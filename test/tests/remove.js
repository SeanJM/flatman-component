const flatman = require('flatman-server');
const el = flatman.el;
const Component = flatman.Component;

module.exports = {
  name : '.remove()',
  this : function () {
    Component.create('A', {
      constructor() {
        this.test = 'test';
      },
      render() {
        return el('div');
      }
    });

    let result = [];

    let r = el('A');
    let c = el('A');

    r.append([c]);
    result.push(r.childNodes.length);

    c.remove();
    result.push(r.childNodes.length);

    return result;
  },
  isDeepEqual : function () {
    return [ 1, 0 ];
  }
};
