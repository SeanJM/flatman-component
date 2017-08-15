Component.prototype.prepend = function (children) {
  this.document.prepend(children);
  this.mapChildrenToNode(children);
  this.childNodes = [].concat(children).concat(this.childNodes);
  return this;
};
