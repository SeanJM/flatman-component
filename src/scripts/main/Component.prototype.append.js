Component.prototype.append = function (children) {
  this.document.append(children);
  this.mapChildrenToNode(children);
  return this;
};
