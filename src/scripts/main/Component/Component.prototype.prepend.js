Component.prototype.prepend = function (children) {
  this.mapChildrenToNode(children);
  this.document.prepend(children);
  return this;
};
