Component.create = function (name, methods) {
  var methodList = [];
  var C = function () {};

  function Constructor(fn) {
    return function (opt) {
      fn.apply(this, opt);
    };
  }

  function wrapper(k) {
    return function () {
      var i = 0;
      var n = arguments.length;
      var $arguments = new Array(n);
      var result;

      for (;i < n; i++) {
        $arguments[i] = arguments[i];
      }

      result = methods[k].apply(this, $arguments);

      return typeof result === 'undefined'
        ? this
        : result;
    };
  }

  for (var k in methods) {
    if (methods.hasOwnProperty(k)) {
      methodList.push(k);
      if (k === 'constructor') {
        C = Constructor(methods[k]);
      }
    }
  }

  for (method in methods) {
    if (method === 'append') {
      C.prototype.append = facade.append(methods[method]);
    } else if (method === 'remove') {
      C.prototype.remove = facade.remove(methods[method]);
    } else if (method === 'removeChild') {
      C.prototype.removeChild = facade.removeChild(methods[method]);
    } else if (method !== 'constructor') {
      C.prototype[method] = wrapper(method);
    }
  }

  for (var method in Component.prototype) {
    if (typeof C.prototype[method] === 'undefined') {
      C.prototype[method] = Component.prototype[method];
    }
  }

  C.__name__ = name;
  Component.lib[name] = C;
};
