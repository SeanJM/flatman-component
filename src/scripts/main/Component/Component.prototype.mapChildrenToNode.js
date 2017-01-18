Component.prototype.mapChildrenToNode = function (children) {
  var self = this;

  function getName(element) {
    return element.dict && element.dict.name || element.name && element.name();
  }

  children.forEach(function (child) {
    var name = getName(child);
    if (name) {
      self.node[name] = child;
    }
  });
  return this;
};
