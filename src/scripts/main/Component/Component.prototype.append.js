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
