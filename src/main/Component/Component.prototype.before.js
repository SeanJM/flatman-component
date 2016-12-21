Component.prototype.before = function (target) {
  if (typeof target === 'undefined') {
    return this.node.document.before();
  }
  this.node.document.before(target);
  return this;
};
