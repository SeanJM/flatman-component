const flatman = require('flatman-server');
const el = flatman.el;
const Component = flatman.Component;

module.exports = {
  name : 'Count children',
  this : function () {
    Component.create('A', {
      constructor() {
        this.test = 'test';
      },
      append(children) {
        this.node.test.append(children);
      },
      render() {
        return el('div', [
          el('div', {
            name : 'test'
          })
        ]);
      }
    });

    let result = [];

    let r = el('A');
    let c = el('A');

    result.push(r.childNodes.length);

    r.append([c]);
    result.push(r.childNodes.length);

    c.remove();
    result.push(r.childNodes.length);

    r.append([c]);
    result.push(r.childNodes.length);

    r.removeChild(c);
    result.push(r.childNodes.length);

    return result;
  },
  isDeepEqual : function () {
    return [ 0, 1, 0, 1, 0 ];
  }
};
