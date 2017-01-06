function Component() {
  this.node = {
    document : el('div')
  };
}

(function () {
  var prototype;
  var methods = [];
  var flatman = require && require('flatman');

  if (flatman) {
    prototype = flatman.el.constructor.prototype;
    methods = Object.getOwnPropertyNames();
  } else {
    prototype = el('div').constructor.prototype;
    for (var k in prototype) {
      methods.push(k);
    }
  }

  methods.forEach(function (method) {
    if (!Component.prototype[method]) {
      Component.prototype[method] = facade.component(method);
    }
  });
}());
