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
