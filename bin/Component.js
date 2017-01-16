(function () {
function column(start, end) {
  var padding = 5;
  var b = padding / 2;
  var center = Math.floor(end / 2);
  var left;
  var right;

  if (start === 1) {
    left = 0;
  } else if (start === end) {
    right = 0;
  }

  if (end === 2) {
    if (start === 1) {
      right = b;
    } else {
      left  = b;
    }
  } else if (end === 3) {
    if (start === 1) {
      right = b;
    } else if (start === 2) {
      right = b * (end - start);
      left  = b * (end - start);
    } else {
      left = b;
    }
  } else {
    if (start === 1) {
      // start
      right = b * (end - 1);
    } else if (start === end) {
      // end
      left  = b * start;
    } else if (start === center && end % 2 !== 0) {
      // center
      left = b * start;
      right = b * start;
    } else {
      left  = b * start;
      right = b * (end - start);
    }
  }

  return {
    left : left,
    right : right
  };
}

var facade = {
  append : function (append) {
    return function (children) {
      var self = this;

      append.call(this, children);

      this.mapChildrenToNode(children);

      children.forEach(function (child) {
        child.parentComponent = self;
        self.childNodes.push(child);
      });

      return this;
    };
  },
  remove : function (remove) {
    return function () {
      remove.call(this);
      return Component.prototype.remove.call(this);
    };
  },
  removeChild : function (removeChild) {
    return function () {
      var i = 0;
      var n = arguments.length;
      var $arguments = new Array(n);

      for (; i < n; i++) {
        $arguments[i] = arguments[i];
      }

      removeChild.apply(this, $arguments);
      return Component.prototype.removeChild.apply(this, $arguments);
    };
  },
  component : function (method) {
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
  }
};

function getName(element) {
  return element.dict && element.dict.name || element.name && element.name();
}
function getNode(element) {
  var target = element && element.node
    ? element.node
    : element;

  var str = target.toString();

  if (str.substr(1, 6) === 'object' && str.substr(-8, 7) === 'Element') {
    return target;
  }

  return getNode(element.node.document);
}

if (typeof module === 'object') module.exports = getNode;

function triggerMount(p) {
  if (typeof p.trigger === 'function') {
    p.trigger('mount');
  }

  if (p.elements) {
    p.elements.forEach(triggerMount);
  }
}

function Component(opt) {
  this.init(opt);
}

Component.lib = {};

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

Component.extend = function () {
  var i = 0;
  var n = arguments.length;

  function each(a) {
    if (typeof a.prototype.append === 'function') {
      a.prototype.append = facade.append(a.prototype.append);
    }

    if (typeof a.prototype.remove === 'function') {
      a.prototype.remove = facade.remove(a.prototype.remove);
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
        Component.prototype[method] = facade.component(method);
      }
    });
  } else {
    throw 'Invalid argument for Component.facade. The argument must be an array of methods.';
  }
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
  var self = this;

  this.childNodes = this.childNodes || [];

  this.mapChildrenToNode(children);

  this.node.document.append(children);

  children.forEach(function (child) {
    getNode(child).parentNode = self.node.document;
  });

  children.forEach(function (child) {
    child.parentComponent = self;
    self.childNodes.push(child);
  });

  return this;
};

Component.prototype.appendTo = function (target) {
  target = typeof el === 'function'
    ? el(target)
    : target;

  this.node.document.appendTo(target);
  this.parentNode = target;

  return this;
};

Component.prototype.before = function (target) {
  var childNodes = this.parentComponent.childNodes;

  if (typeof target === 'undefined') {
    return childNodes[childNodes.indexOf(target) - 1];
  }

  this.node.document.before(target);
  childNodes.splice(childNodes.indexOf(this), 0, target);

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

Component.prototype.column = function () {
  var isArray = Array.isArray(arguments[0]);

  var start = isArray
    ? arguments[0][0]
    : arguments[0];

  var end = isArray
    ? arguments[0][1]
    : arguments[1];

  var width = (
    (
      isArray
        ? arguments[0][2]
        : arguments[2]
    ) || 100 / end
  );

  var res = column(start, end);

  this.node.document.style({
    paddingLeft : res.left,
    paddingRight : res.right,
    width : width + '%'
  });

  return this;
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

Component.prototype.init = function (opt) {
  this.node = this.node || {};
  this.childNodes = this.childNodes || [];

  this.dict = {
    disabledElements : [],
    isDisabled : false
  };

  for (var k in opt) {
    if (k.substr(0, 4) === 'once') {
      this.once(k.substr(4), opt[k]);
    } else if (k.substr(0, 2) === 'on') {
      this.on(k.substr(2), opt[k]);
    } else {
      this.dict[k] = opt[k];
    }
  }
};

Component.prototype.mapChildrenToNode = function (children) {
  var self = this;
  children.forEach(function (child) {
    var name = getName(child);
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

Component.prototype.remove = function () {
  var node = getNode(this.node.document);
  var parentNode = getNode(this.parentNode);
  var parentComponent = this.parentComponent;

  var index = this.parentNode.childNodes.indexOf(this);
  parentNode.removeChild(node);
  this.parentNode.childNodes.splice(index, 1);

  if (parentComponent) {
    index = parentComponent.childNodes.indexOf(this);
    parentComponent.childNodes.splice(index, 1);
  }

  return this;
};

Component.prototype.removeChild = function (maybeChild) {
  if (Array.isArray(maybeChild)) {
    maybeChild.forEach(function (child) {
      child.remove();
    });
  } else {
    maybeChild.remove();
  }
  return this;
};

Component.prototype.trigger = function () {
  var self = this;
  var isNameString = typeof arguments[0] === 'string';

  var name = isNameString
    ? arguments[0].toLowerCase()
    : arguments[0].type.toLowerCase();

  var e = isNameString
    ? arguments[1]
    : arguments[0];

  var names = name.split(',')
    .map(function (a) { return a.trim(); })
    .filter(function (a) { return a.length && self.subscribers && self.subscribers[a]; });

  if (typeof e === 'undefined') {
    e = {
      type : name,
      target : this
    };
  }

  if (typeof e.type === 'undefined') {
    e.type = name;
  }

  if (e.target === 'undefined') {
    e.target = this;
  }

  if (typeof this.subscribers === 'undefined') {
    this.subscribers = {};
  }

  names.forEach(function (name) {
    self.subscribers[name].slice().forEach(function (callback) {
      callback.call(self, e);
    });
  });

  return this;
};

if (typeof window === 'object') {
  window.Component = Component;
} else if (typeof module === 'object' && module.exports) {
  module.exports = Component;
}

}());