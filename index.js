function createComponentMethodProxy(method, methods) {
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

function getRefs(self, node) {
  for (var i = 0, n = node.childNodes.length; i < n; i++) {
    if (node.childNodes[i].ref && !self.refs[node.childNodes[i].ref]) {
      self.refs[node.childNodes[i].ref] = node.childNodes[i];
    }

    if (node.childNodes[i].childNodes) {
      getRefs(self, node.childNodes[i]);
    }
  }
}

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
        if (this.document.childNodes.length) {
          [].push.apply(this.childNodes, this.document.childNodes);
        }

        getRefs(this, this);

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

function Component() {}

Component.lib = {};
Component.function = {};
Component.onCreateListeners = [];


Component.create = function (tagName, methods) {
  if (Component.lib[tagName]) {
    throw new Error(
      'Cannot create Component function: duplicate name \'' + tagName + '\''
    );
  }

  if (typeof methods === 'function') {
    Component.lib[tagName] = Component.create(tagName, {
      render: function (props) {
        return methods(props);
      }
    });
  } else {
    Component.lib[tagName] = createComponentConstructor(
      tagName,
      methods
    );
  }

  return Component.lib[tagName];
};


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


Component.facade = function (methods) {
  if (Array.isArray(methods)) {
    methods.forEach(function (method) {
      if (!Component.prototype[method]) {
        Component.prototype[method] = Component.facade.method(method);
      }
    });
  } else {
    throw 'Invalid argument for Component.facade. The argument must be an array of methods.';
  }
};

Component.facade.method = function (method) {
  return function () {
    var i = 0;
    var n = arguments.length;
    var $arguments = new Array(n);
    var root = this.document;
    var result;

    for (;i < n; i++) {
      $arguments[i] = arguments[i];
    }

    result = root[method].apply(root, $arguments);
    return typeof result === 'undefined' ? this : result;
  };
};

Component.find = function (name) {
  var matches = [];
  for (var k in Component.lib) {
    if (name.test(k)) {
      matches.push(k);
    }
  }
  return matches;
};


Component.fn = function (name, callback) {
  if (typeof name === "string" && typeof callback === "function") {
    Component.prototype[name] = callback;

    for (var k in Component.lib) {
      if (typeof Component.lib[k].prototype[name] === "undefined") {
        Component.lib[k].prototype[name] = callback;
      } else {
        console.log(
          "[Component] Warning: the method \"" + name + "\" could not be added to \"" + k + "\""
        );
      }
    }

  } else if (typeof name !== "string") {
    throw new Error(
      "Component.fn is missing the \"name\" argument."
    );
  } else if (typeof callback !== "function") {
    throw new Error(
      "Component.fn is missing the \"callback\" argument."
    );
  }
};


Component.off = function (names, callback) {
  function each(name, callback) {
    var subscribers = Component.subscribers[name];
    subscribers.splice(subscribers.indexOf(callback), 1);
  }

  names = names.toLowerCase().split(',');
  for (var i = 0, n = names.length; i < n; i++) {
    names[i] = names[i].trim();
    if (names[i].length && callback) {
      each(names[i], callback);
    } else while (Component.subscribers[names[i]].length) {
      each(names[i], Component.subscribers[names[i]][0]);
    }
  }

  return Component;
};


Component.onCreate = function (callback) {
  Component.onCreateListeners.push(callback);
  return Component;
};


Component.trigger = function () {
  var subscribers = Component.subscribers;
  var names;
  var detail;

  if (typeof arguments[0] === 'string') {
    names = arguments[0];
    detail = arguments[1] || {};
  } else {
    names = arguments[0].type;
    detail = arguments[0];
  }

  names = names.toLowerCase().split(',');

  if (!Component.node.disabled) {
    names.forEach(function (name) {
      name = name.trim();
      if (name.length && subscribers[name]) {
        subscribers[name].forEach(function (callback) {
          callback(Object.assign({}, detail, { type : name }));
        });
      }
    });
  }

  return Component;
};


Component.prototype.after = function (target) {
  this.document.after.call(this, target);
  return this;
};


Component.prototype.append = function (children) {
  this.document.append(children);
  this.mapChildrenToNode(children);
  [].push.apply(this.childNodes, children);
  return this;
};


Component.prototype.appendTo = function (parentNode) {
  this.document.appendTo(parentNode);
  this.parentNode = parentNode;
  return this;
};


// 'this' is appended before target
Component.prototype.before = function (target) {
  this.document.before.call(this, target);
  return this;
};


Component.prototype.closest = function (selector) {
  return this.document.closest.call(this, selector);
};


Component.prototype.disable = function () {
  this.document.disable();
  this.document.childNodes.forEach(function (a) {
    a.disable();
  });
  return this;
};


Component.prototype.is = function (selector) {
  return this.document.is.call(this, selector);
};


Component.prototype.enable = function () {
  this.document.enable();
  this.document.childNodes.forEach(function (a) {
    a.enable();
  });
  return this;
};


Component.prototype.mapChildrenToNode = function (children) {
  var ref;

  children = Array.isArray(children)
    ? children
    : [ children ];

  for (var i = 0, n = children.length; i < n; i++) {
    ref = children[i].ref;
    children[i].parentNode = this;
    if (ref && !this.refs[ref]) {
      this.refs[ref] = children[i];
    }
  }

  return this;
};

Component.prototype.off = function (name, callback) {
  var self = this;

  if (typeof this.subscribers === 'undefined') {
    this.subscribers = {};
  }

  name
    .toLowerCase()
    .split(',')
    .forEach(function (a) {
      var i;

      a = a.trim();

      if (typeof self.subscribers[a] !== 'undefined') {
        i = self.subscribers[a].indexOf(callback);

        while (i !== -1) {
          self.subscribers[a].splice(i, 1);
          i = self.subscribers[a].indexOf(callback);
        }

        if (typeof callback === 'undefined') {
          while (self.subscribers[a].length) {
            self.subscribers[a].shift();
          }
        }
      }
    });

  return this;
};


Component.prototype.on = function (name, callback) {
  var self = this;

  if (typeof this.subscribers === 'undefined') {
    this.subscribers = {};
  }

  if (callback) {
    name
    .toLowerCase()
    .split(',')
    .forEach(function (a) {
      a = a.trim();
      if (a.length) {
        if (typeof self.subscribers[a] === 'undefined') {
          self.subscribers[a] = [];
        }

        if (self.subscribers[a].indexOf(callback) === -1) {
          self.subscribers[a].push(callback);
        }
      }
    });
  }


  return this;
};


Component.prototype.once = function (names, callback) {
  var self = this;

  function ref(e) {
    callback.call(self, e);
    self.off(names, ref);
  }

  if (callback) {
    this.on(names, ref);
  }

  return this;
};


Component.prototype.prepend = function (children) {
  this.document.prepend(children);
  this.mapChildrenToNode(children);
  this.childNodes = [].concat(children).concat(this.childNodes);
  return this;
};


Component.prototype.remove = function () {
  this.document.remove.call(this);
  return this;
};


Component.prototype.removeChild = function (child) {
  this.document.removeChild(child);
  this.childNodes.splice(this.childNodes.indexOf(child), 1);
  return this;
};


Component.prototype.trigger = function () {
  var self = this;
  var names = arguments[0];
  var object = arguments[1];
  var $names;

  function filterNames(names) {
    var split = names.split(',');
    var filter = [];
    for (i = 0, n = split.length; i < n; i++) {
      split[i] = split[i].trim();
      if (split[i].length && self.subscribers[split[i]]) {
        filter.push(split[i]);
      }
    }
    return filter;
  }

  this.subscribers = this.subscribers || {};

  if (typeof names === 'string') {
    object = typeof object !== "undefined" ? object : {};
    $names = filterNames(names.toLowerCase());
  } else {
    object = arguments[0];
    $names = filterNames(object.type.toLowerCase());
  }

  $names.forEach(function (name) {
    self.subscribers[name]
      .slice()
      .forEach(function (callback) {
        callback.call(self, object);
      });
  });

  return this;
};


if (typeof module !== 'undefined' && module.exports) {
  module.exports = Component;
}
