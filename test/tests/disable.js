const flatman = require('flatman-server');
const el = flatman.el;
const Component = flatman.Component;

module.exports = {
  name : 'Disable',
  this : function () {
    let result = [];
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

    a.disable();
    result.push(a.attr('disabled'));
    result.push(a.node.anAwesomeName.attr('disabled'));

    a.enable();
    result.push(a.attr('disabled'));
    result.push(a.node.anAwesomeName.attr('disabled'));

    return result;
  },
  isDeepEqual : function () {
    return [ 'disabled', 'disabled', null, null ];
  }
};
