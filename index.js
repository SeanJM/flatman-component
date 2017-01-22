function getSelectorObject(selector) {
  var classNames = selector.match(/\.[a-zA-Z0-9\-\_]+/g);
  var id = selector.match(/\#[a-zA-Z0-9\-\_]+/);
  var attr = selector.match(/\[[^\]]+?\]/g);
  var tagName = selector.match(/^[a-zA-Z0-9\-\_]+/);

  var selectorObject = {
    tagName : tagName ? tagName[0] : false,
    attributes : {}
  };

  if (classNames) {
    selectorObject.attributes.className = classNames.map(function (a) {
      return a.slice(1);
    });
  }

  if (id) {
    selectorObject.attributes.id = id[0].slice(1);
  }

  if (attr) {
    attr.forEach(function (string) {
      var value = string.match(/\[([a-zA-Z0-9\-\_]+)(?:(\*|\^|\$|)=([^\]]+?)\]|)/);
      value[1] = value[1] === 'class' ? 'className' : value[1];
      value[3] = value[3] ? value[3].slice(1, -1) : false;

      if (value[2]) {
        if (value[2] === '*') {
          selectorObject.attributes[value[1]] = new RegExp(value[3]);
        } else if (value[2] === '^') {
          selectorObject.attributes[value[1]] = new RegExp('^' + value[3]);
        } else if (value[2] === '$') {
          selectorObject.attributes[value[1]] = new RegExp(value[3] + '$');
        }
      } else if (value[3]) {
        selectorObject.attributes[value[1]] = new RegExp('^' + value[3] + '$');
      } else {
        selectorObject.attributes[value[1]] = new RegExp('.+');
      }
    });
  }

  return selectorObject;
}

function Component() {}
Component.lib = {};
Component.function = {};

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

Component.extend = function () {
  var i = 0;
  var n = arguments.length;

  function each(a) {
    if (typeof a.prototype.append === 'function') {
      a.prototype.append = Component.facade.append(a.prototype.append);
    }

    if (typeof a.prototype.remove === 'function') {
      a.prototype.remove = Component.facade.remove(a.prototype.remove);
    }

    for (var k in Component.prototype) {
      if (typeof a.prototype[k] === 'undefined') {
        a.prototype[k] = Component.prototype[k];
      }
    }
  }

  for (; i < n; i++) {
    each(arguments[i]);
  }
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

Component.facade.append = function (append) {
  return function (children) {
    append.call(this, children);
    this.mapChildrenToNode(children);
    return this;
  };
};

Component.facade.method = function (method) {
  return function () {
    var i = 0;
    var n = arguments.length;
    var $arguments = new Array(n);
    var root = this.node.document;
    var result;

    for (;i < n; i++) {
      $arguments[i] = arguments[i];
    }

    result = root[method].apply(root, $arguments);
    return typeof result === 'undefined' ? this : result;
  };
};
Component.prototype.after = function (target) {
  var childNodes = this.parentComponent.childNodes;

  if (typeof target === 'undefined') {
    return childNodes[childNodes.indexOf(target) + 1];
  }

  this.node.document.after(target);
  childNodes.splice(childNodes.indexOf(this) + 1, 0, target);

  return this;
};

Component.prototype.append = function (children) {
  this.mapChildrenToNode(children);
  this.node.document.append(children);
  return this;
};

Component.prototype.closest = function (selector) {
  var p = this.parentComponent;

  if (Component.lib[selector]) {
    selector = Component.lib[selector];
    while (p) {
      if (p instanceof selector) {
        return p;
      }
      p = p.parentComponent;
    }
  } else {
    return this.node.document.closest(selector);
  }

  return false;
};

Component.prototype.disable = function () {
  this.node.document.disable();
  this.node.document.childNodes.forEach(function (a) {
    a.disable();
  });
  return this;
};

Component.prototype.enable = function () {
  this.node.document.enable();
  this.node.document.childNodes.forEach(function (a) {
    a.enable();
  });
  return this;
};

Component.prototype.mapChildrenToNode = function (children) {
  var self = this;

  children.forEach(function (child) {
    var name = child.name && child.name();
    if (name) {
      self.node[name] = child;
    }
  });
  return this;
};

Component.prototype.mount = function () {
  function triggerMount(element) {
    element.trigger('mount');

    if (element.node.document) {
      element.node.document.trigger('mount');
    }
  }

  triggerMount(this);
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

  return this;
};

Component.prototype.once = function (names, callback) {
  var self = this;

  function ref(e) {
    callback.call(self, e);
    self.off(names, ref);
  }

  this.on(names, ref);

  return this;
};

Component.prototype.prepend = function (children) {
  var self = this;

  this.childNodes = this.childNodes || [];

  this.mapChildrenToNode(children);
  this.node.document.prepend(children);
  [].shift.apply(this.childNodes, children);

  children.forEach(function (child) {
    child.parentComponent = self;
    self.childNodes.push(child);
  });

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
    $names = filterNames(names.toLowerCase());
    object = object || { target : this };
  } else {
    $names = filterNames(object.type.toLowerCase());
    object.target = object.target || this;
  }

  $names.forEach(function (name) {
    self.subscribers[name]
      .slice()
      .forEach(function (callback) {
        var $object = Object.assign(
          {},
          object,
          { type : name }
        );
        callback.call(self, $object);
      });
  });

  return this;
};

if (typeof module === 'object' && module.exports) {
  module.exports = Component;
}
