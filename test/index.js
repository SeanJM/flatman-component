const TinyTest = require('tiny-test');
const path = require('path');
const m = require('match-file-utility');

const tests = m('test/tests/', /\.js$/).map(a => require(path.resolve(a)));

module.exports = new TinyTest(function (test, load) {
  tests.forEach(function (opts) {
    var t = test(opts.name);

    t.this(opts.this);

    if (opts.isEqual) {
      t.isEqual(opts.isEqual);
    } else if (opts.isDeepEqual) {
      t.isDeepEqual(opts.isDeepEqual);
    } else if (opts.isNotEqual) {
      t.isNotEqual(opts.isNotEqual);
    } else if (opts.isFailure) {
      t.isFailure(opts.isFailure);
    }
  });

  load();
});
