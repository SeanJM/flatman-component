Component.prototype.append = function (children) {
  var self = this;
  var root = this.node.document;

  this.childNodes = this.childNodes || [];

  this.mapChildrenToNode(children);

  root.append(children.map(function (a) {
    var node = getNode(a);
    a.parentNode = root;
    return node;
  }));

  children.forEach(function (child) {
    child.parentComponent = self;
    self.childNodes.push(child);
  });

  return this;
};
