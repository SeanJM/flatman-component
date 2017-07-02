Component.create = function (name) {
  function createFunction(thunk) {
    Component.function[name] = thunk;
  }

  function wrapper(method, methods) {
    return function () {
      var i = 0;
      var n = arguments.length;
      var $arguments = new Array(n);
      var result;

      for (;i < n; i++) {
        $arguments[i] = arguments[i];
      }

      result = methods[method].apply(this, $arguments);

      return result;
    };
  }

  function createConstructor(methods) {
    var C = methods && methods.constructor
      ? Constructor(methods.constructor)
      : function () {};

    var eventObject = {
      name : name,
      constructor : C
    };

    function Constructor(fn) {
      return function (opt) {
        fn.call(this, opt);
      };
    }

    for (method in methods) {
      if (method === 'append') {
        C.prototype.append = Component.facade.append(methods[method]);
      } else if (method === 'prepend') {
        C.prototype.prepend = Component.facade.prepend(methods[method]);
      } else if (method !== 'constructor') {
        C.prototype[method] = wrapper(method, methods);
      }
    }

    for (method in Component.prototype) {
      if (typeof C.prototype[method] === 'undefined') {
        C.prototype[method] = Component.prototype[method];
      }
    }

    Component.lib[name] = C;

    Component.onCreateListeners
      .forEach(function (subscriber) {
        subscriber(eventObject);
      });

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
