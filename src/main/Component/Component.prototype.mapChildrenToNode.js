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
