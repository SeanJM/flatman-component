const TinyTest = require('../grunt/tinyTest');
const path = require('path');
const m = require('match-file-utility');

const tests = m('test/tests/', /\.js$/).map(a => require(path.resolve(a)));

module.exports = new TinyTest(function (test) {
  tests.forEach(function (opts) {
    var t = test(opts.name);

    t.this(opts.this());

    if (opts.equal) {
      t.equal(opts.equal());
    } else if (opts.notEqual) {
      t.notEqual(opts.equal());
    } else if (opts.fail) {
      t.fail(opts.fail());
    }
  });

  test.done();
});
