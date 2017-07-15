function createComponentConstructor(tagName, methods) {
  var C = methods && methods.constructor
    ? function () {
        var props = {};
        var children = [];

        if (Array.isArray(arguments[0])) {
          children = arguments[0];
        } else if (typeof arguments[0] === 'object') {
          props = arguments[0];
          children = arguments[1] || children;
        }

        methods.constructor.call(this, props);
        createComponentProperties.call(this, tagName, props, children);
      }
    : function () {
        var props = {};
        var children = [];

        if (Array.isArray(arguments[0])) {
          children = arguments[0];
        } else if (typeof arguments[0] === 'object') {
          props = arguments[0];
          children = arguments[1] || children;
        }

        createComponentProperties.call(this, tagName, props, children);
      };

  var eventObject = {
    tagName : tagName,
    constructor : C
  };

  for (method in methods) {
    if (method !== 'constructor') {
      C.prototype[method] = createComponentMethodProxy(method, methods);
    } else {
      C.prototype[method] = methods[method];
    }
  }

  for (method in Component.prototype) {
    if (typeof C.prototype[method] === 'undefined') {
      C.prototype[method] = Component.prototype[method];
    }
  }

  for (var i = 0, n = Component.onCreateListeners.length; i < n; i++) {
    Component.onCreateListeners[i](eventObject);
  }

  return C;
}