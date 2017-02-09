const flatman = require('flatman-server');
const el = flatman.el;
const Component = flatman.Component;

module.exports = {
  name : 'Add class on \'className\' array',
  this : function () {
    Component.create('B', {
      add() {
        this.addClass('is');
        return this;
      },
      render() {
        return el('div', { className : ['this', 'array' ]});
      }
    });

    let a = el('B').add();
    return a.attr('class');
  },
  isEqual : function () {
    return 'this array is';
  }
};
