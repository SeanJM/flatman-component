Component.prototype.appendTo = function (child) {
  child.mapChildrenToNode(this);
  this.document.appendTo(child);
  return this;
};
