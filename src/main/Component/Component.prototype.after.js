Component.prototype.after = function (target) {
  if (typeof target === 'undefined') {
    return this.node.document.after();
  }
  this.node.document.after(target);
  return this;
};
