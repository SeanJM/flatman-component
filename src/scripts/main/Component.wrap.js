Component.wrap = function wrap(tagName, methods) {
  var cTemp = el(tagName);
  var render = methods.render;
  var constructor = methods.constructor;

  // These are the methods bound the wrapped component, it's contextual 'this'
  for (var k in cTemp) {
    if (typeof cTemp[k] === 'function' && !methods[k] && !keyGuard[k]) {
      methods[k] = wrapMethod(k);
    }
  }

  methods.constructor = function (props) {
    this.component = el(tagName);
    if (constructor) {
      constructor.call(this, props);
    }
  };

  methods.render = function (props) {
    return render.call(this, props);
  };

  return methods;
};
