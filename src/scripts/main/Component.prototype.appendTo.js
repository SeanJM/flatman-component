Component.prototype.appendTo = function (child) {
  this.document.appendTo(child);
  Component.prototype.mapChildrenToNode.call(child, this);
  return this;
};
