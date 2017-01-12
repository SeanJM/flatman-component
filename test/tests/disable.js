const flatman = require('flatman-server');
const el = flatman.el;
const Component = flatman.Component;

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

module.exports = {
  name : 'Disable',
  this : function () {
    let a = el('B');
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
