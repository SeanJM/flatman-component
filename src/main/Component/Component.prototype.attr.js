Component.prototype.attr = function (property, value) {
  if (typeof value == 'undefined') {
    return this.node.document.attr(property);
  }
  this.node.document.attr(property, value);
  return this;
};
