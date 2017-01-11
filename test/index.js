const TinyTest = require('../grunt/tinyTest');
const flatman = require('flatman-server');
const el = flatman.el;
const Component = flatman.Component;

module.exports = new TinyTest(function (test) {
  class A {
    append(children) {
      this.node.test.append(children);
    }
    render() {
      return el('div', [
        el('div', {
          name : 'test'
        })
      ]);
    }
  }

  Component.extend(A);

  test('Count children')
    .this(el(A).childNodes.length)
    .equal(0);

  test('Count children')
    .this(el(A, [ el('div', { className : 'child' }) ]).childNodes.length)
    .equal(1);

  test.done();
});
