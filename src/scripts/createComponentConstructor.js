function createComponentConstructor(tagName, methods) {
  var C = function Component(a, b) {
    var props = {};
    var children = [];

    if (Array.isArray(a)) {
      children = a;
    } else if (typeof a === 'object') {
      props = a;
      children = b || children;
    }

    if (methods && methods.constructor) {
      methods.constructor.call(this, props);
    }

    this.tagName = tagName;
    this.childNodes = [];
    this.props = this.props || {};
    this.refs = this.refs || {};

    for (var k in props) {
      if (k === "ref") {
        this.ref = props[k];
      } else if (!this.props[k]) {
        this.props[k] = props[k];
      }
    }

    if (typeof this.render === 'function') {
      this.document = this.render(props);
      this.node = this.document.node;
      if (this.document) {
        getComponentRefs(this, this.document);
        if (children.length) {
          this.append(children);
        }
      } else {
        throw new Error('Invalid component, component must return a node in the render function.');
      }
    }
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