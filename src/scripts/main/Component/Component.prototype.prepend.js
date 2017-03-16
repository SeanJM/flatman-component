Component.prototype.prepend = function (children) {
  this.mapChildrenToNode(children);
  this.node.document.prepend(children);
  return this;
};
