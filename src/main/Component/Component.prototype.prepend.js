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
