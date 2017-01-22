Component.create = function (name) {
  function createFunction(thunk) {
    Component.function[name] = thunk;
  }

  function createConstructor(methods) {
    var methodList = [];
    var C = function () {};

    function Constructor(fn) {
      return function (opt) {
        fn.call(this, opt);
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

        return result;
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
        C.prototype.append = Component.facade.append(methods[method]);
      } else if (method !== 'constructor') {
        C.prototype[method] = wrapper(method);
      }
    }

    for (var method in Component.prototype) {
      if (typeof C.prototype[method] === 'undefined') {
        C.prototype[method] = Component.prototype[method];
      }
    }

    Component.lib[name] = C;
    return C;
  }

  if (Component.lib[name] || Component.function[name]) {
    throw 'Cannot create Component function: duplicate name \'' + name + '\'';
  }

  if (typeof arguments[1] === 'function') {
    return createFunction(arguments[1]);
  } else {
    return createConstructor(arguments[1]);
  }
};
