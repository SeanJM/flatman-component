(function () {
var IS_NODE_JS = (
  typeof module !== 'undefined'
  && typeof require === 'function'
);

var el = IS_NODE_JS
  ? require('flatman').el
  : window.el;

var _ = IS_NODE_JS
  ? require('lodash')
  : window._;

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

function triggerMount(p) {
  if (typeof p.trigger === 'function') {
    p.trigger('mount');
  }

  if (p.elements) {
    p.elements.forEach(triggerMount);
  }
}

function Component() {
  this.node = {
    document : el('div')
  };
}

Component.extend = function () {
  var i = 0;
  var n = arguments.length;

  function each(a) {
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

Component.prototype.addClass = function (className) {
  this.node.document.addClass(className);
  return this;
};

Component.prototype.append = function (a) {
  var target = Component.prototype.target.call(this, this.node.document);
  target.append(a);
};

Component.prototype.appendTo = function (target) {
  var node;

  if (typeof target === 'string') {
    node = document.querySelector(target);
  } else if (target && el.isElement(target)) {
    node = target;
  } else if (target && el.isElement(target.node)) {
    node = target.node;
  } else {
    throw 'error \'Component.prototype.appendTo\', invalid target \'' + Object.prototype.toString.call(target) + '\'';
  }

  this.node.document.appendTo(target);

  if (
    typeof this.trigger === 'function'
    && node
    && document.body.contains(node)
  ) {
    triggerMount(this);
  }

  return this;
};

Component.prototype.attr = function (property, value) {
  if (typeof value == 'undefined') {
    return this.node.document.attr(property);
  }
  this.node.document.attr(property, value);
};

Component.prototype.before = function (a) {
  var target = Component.prototype.target.call(this, this.node.document);
  target.before(a);
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

Component.prototype.contains = function (node) {
  return this.node.document.contains(
    el.getNode(node)
  );
};

Component.prototype.disable = function () {
  var i = 0;
  var elements = this.dict.elements;
  var n = this.dict.elements.length;

  this.dict.disabledElements = elements.filter(a => a.dict.isDisabled);
  this.dict.isDisabled = true;

  for (; i < n; i++) {
    elements[i].disable();
  }

  this.node.document.disable();
  return this;
};

Component.prototype.enable = function () {
  var i = 0;
  var n = this.dict.elements.length;
  var elements = this.dict.elements;
  var disabledElements = this.dict.disabledElements;

  this.dict.isDisabled = false;

  for (; i < n; i++) {
    if (disabledElements.indexOf(elements[i]) === -1) {
      elements[i].enable();
    }
  }

  this.node.document.enable();
  return this;
};

Component.prototype.focus = function () {
  this.node.document.focus();
  return this;
};

Component.prototype.hasParent = function (a) {
  var root = el.getNode(this.node.document);

  function hasParent(b) {
    return el.getNode(b).contains(root);
  }

  if (Array.isArray(a)) {
    return a.map(hasParent);
  }

  return hasParent(a);
};

Component.prototype.init = function (opt) {
  this.node = {};
  this.dict = Object.assign({
    elements : [],
    disabledElements : [],
    isDisabled : false
  }, opt);
};

Component.prototype.mount = function () {
  function triggerMount(element) {
    element.trigger('mount');

    if (element.node.document) {
      element.node.document.trigger('mount');
    }

    if (element.elements) {
      element.elements.forEach(triggerMount);
    }
  }

  triggerMount(this);
};

Component.prototype.name = function (name) {
  if (typeof name === 'undefined') {
    return this.node.document.name();
  }
  this.node.document.name(name);
  return this;
};

Component.prototype.off = function (name, callback) {
  var self = this;

  if (typeof this.subscribers === 'undefined') {
    this.subscribers = {};
  }

  name.split(',').forEach(function (a) {
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

Component.prototype.offset = function () {
  return this.node.document.offset();
};

Component.prototype.on = function (name, callback) {
  var names = name.split(',').filter(function (a) {
    return a.length;
  });
  var i = 0;
  var n = names.length;
  var x;

  if (typeof this.subscribers === 'undefined') {
    this.subscribers = {};
  }

  for (; i < n; i++) {
    x = names[i].trim();

    if (typeof this.subscribers[x] === 'undefined') {
      this.subscribers[x] = [];
    }

    if (this.subscribers[x].indexOf(callback) === -1) {
      this.subscribers[x].push(callback);
    }
  }

  return this;
};

Component.prototype.once = function (names, callback) {
  var self = this;

  var ref = function (e) {
    callback.call(self, e);
    self.off(names, ref);
  };

  this.on(names, ref);

  return this;
};

Component.prototype.removeClass = function (className) {
  this.node.document.removeClass(className);
  return this;
};

Component.prototype.style = function (a, b) {
  this.node.document.style(a, b);
  return this;
};

function Target(self, target) {
  this.root = self;
  this.target = target;

  if (typeof self.dict === 'undefined') {
    self.dict = { elements : [] };
  } else if (typeof self.dict.elements === 'undefined') {
    self.dict.elements = [];
  }
}

function getName(element) {
  if (
    typeof element.name === 'function'
    && element.name()
  ) {
    return element.name();
  } else {
    return (
      element.constructor.name
      && element.node
      && element.node.document
    ) ? _.camelCase(element.constructor.name)
      : false;
  }
}

Target.prototype.before = function (children) {
  var name;

  if (!Array.isArray(children)) {
    children = [children];
  }

  for (var i = 0, n = children.length; i < n; i++) {
    name = getName(children[i]);
    if (name && !this.root.node[name]) {
      this.root.node[name] = children[i];
    }
  }

  [].push.apply(this.root.dict.elements, children);
  this.target.before(children);

  if (
    typeof document === 'object'
    && this.target.hasParent(document.body)
  ) {
    this.root.mount();
  }
};

Target.prototype.append = function (children) {
  var name;

  if (!Array.isArray(children)) {
    children = [children];
  }

  for (var i = 0, n = children.length; i < n; i++) {
    name = getName(children[i]);
    if (name && !this.root.node[name]) {
      this.root.node[name] = children[i];
    }
  }

  [].push.apply(this.root.dict.elements, children);

  this.target.append(children);

  if (
    typeof document === 'object'
    && this.target.hasParent(document.body)
  ) {
    this.root.mount();
  }
};

Component.prototype.target = function (target) {
  return new Target(this, target);
};

Component.prototype.trigger = function (name, e) {
  var names = _.filter(name.split(','), function (a) {
    return a.length;
  });
  var i = 0;
  var n = names.length;
  var index;
  var x;
  var j;

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

  for (; i < n; i++) {
    x = names[i].trim();

    if (typeof this.subscribers[x] === 'object') {
      for (j = this.subscribers[x].length - 1; j >= 0; j--) {
        this.subscribers[x][j].call(this, e);
      }
    }
  }

  return this;
};

Component.prototype.value = function (value) {
  if (typeof value === 'undefined') {
    return this.node.document.value();
  }
  
  this.node.document.value(value);
  return this;
};

if (typeof window === 'object') {
  window.Component = Component;
} else if (typeof module === 'object' && module.exports) {
  module.exports = Component;
}

}());