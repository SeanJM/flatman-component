function createComponentConstructor(tagName, methods) {
  var C = methods && methods.constructor
    ? function (props, children) {
        methods.constructor.call(this, props);
        createComponentProperties.call(this, tagName, props, children);
      }
    : function () {
        createComponentProperties.call(this, {});
      };

  var eventObject = {
    tagName : tagName,
    constructor : C
  };

  for (method in methods) {
    if (method === 'append') {
      C.prototype.append = Component.facade.append(methods[method]);
    } else if (method === 'prepend') {
      C.prototype.prepend = Component.facade.prepend(methods[method]);
    } else if (method !== 'constructor') {
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