Component.prototype.append = function (children) {
  this.mapChildrenToNode(children);
  this.node.document.append(children);
  return this;
};
