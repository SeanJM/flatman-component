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
    a.disable();
    return [ a.attr('disabled'), a.node.anAwesomeName.attr('disabled') ];
  },
  equal : function () {
    return [ 'disabled', 'disabled' ];
  }
};
