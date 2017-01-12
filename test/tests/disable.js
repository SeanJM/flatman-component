const flatman = require('flatman-server');
const el = flatman.el;
const Component = flatman.Component;

Component.lib = {};

Component.create('B', {
  constructor() {
    this.test = 'test';
  },
  render() {
    return el('div', [
      el('div', {
        name : 'anAwesomeName'
      })
    ]);
  }
});

let a = el('B');

module.exports = {
  name : 'Disable',
  this : function () {
    let res = [];

    a.disable();
    res.push(a.attr('disabled'));
    res.push(a.node.anAwesomeName.attr('disabled'));

    a.enable();
    res.push(a.attr('disabled'));
    res.push(a.node.anAwesomeName.attr('disabled'));

    return res;
  },
  equal : function () {
    return [ 'disabled', 'disabled', null, null ];
  }
};
