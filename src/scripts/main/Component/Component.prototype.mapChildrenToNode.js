Component.prototype.mapChildrenToNode = function (children) {
  var self = this;
  var name;

  children = Array.isArray(children)
    ? children
    : [ children ];

  for (var i = 0, n = children.length; i < n; i++) {
    name = children[i].name && children[i].name();

    if (name && !self.node[name]) {
      self.node[name] = children[i];
    }
  }

  return this;
};