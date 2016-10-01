function Target(self, target) {
  this.root = self;
  this.target = target;
  if (typeof self.elements === 'undefined') {
    self.elements = [];
  }
}

function getName(element) {
  if (
    typeof element.name === 'function'
    && element.name()
  ) {
    return element.name()
  } else {
    return (
      element.constructor.name
      && element.node
      && element.node.document
    ) ? _.camelCase(element.constructor.name)
      : false
  }
}


Target.prototype.append = function () {
  var i = 0;
  var n = arguments.length;
  var children = [];
  var name = [];

  for (; i < n; i++) {
    children.push(arguments[i]);
    name = getName(arguments[i]);
    if (name && !this.root.node[name]) {
      this.root.node[name] = arguments[i];
    }
  }

  this.root.elements.push.apply(
    this.root.elements,
    children
  );

  this.target.append.apply(
    this.target,
    children
  );

  if (
    typeof document === 'object'
    && this.target.hasParent(document.body)
  ) {
    this.root.mount();
  }
};
