Component.prototype.append = function (children) {
  this.document.append(children);
  this.mapChildrenToNode(children);
  [].push.apply(this.childNodes, children);
  return this;
};
