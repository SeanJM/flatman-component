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
