Component.prototype.append = function (children) {
  this.mapChildrenToNode(children);
  this.document.append(children);
  return this;
};
