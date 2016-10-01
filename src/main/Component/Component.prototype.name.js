Component.prototype.name = function (name) {
  if (typeof name === 'undefined') {
    return this.node.document.name();
  }
  this.node.document.name(name);
  return this;
};
