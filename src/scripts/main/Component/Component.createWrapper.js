Component.createWrapper = function (el) {
  var keyGuard = {};
  var tempElement = el('div');

  for (var k in tempElement) {
    if (typeof tempElement[k] === 'function') {
      keyGuard[k] = true;
    }
  }

  tempElement = undefined;

  function wrapMethod(method) {
    return function () {
      var i = 0;
      var n = arguments.length;
      var $arguments = new Array(n);
      var result;

      for (;i < n; i++) {
        $arguments[i] = arguments[i];
      }

      result = this.node.component[method].apply(this.node.component, $arguments);

      if (typeof result === 'undefined') {
        return this;
      }

      return result;
    };
  }

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
      this.node = {
        component : el(tagName)
      };
      if (constructor) {
        constructor.call(this, props);
      }
    };

    methods.render = function (props) {
      return render.call(this, props);
    };

    return methods;
  };
};