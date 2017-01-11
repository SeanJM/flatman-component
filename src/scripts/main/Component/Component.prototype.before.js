Component.prototype.before = function (target) {
  if (typeof target === 'undefined') {
    return this.node.document.before();
  }
  this.node.document.before(target);
  this.parentNode = target.parentNode;
  this.parentNode.childNodes.splice(this.parentNode.childNodes.indexOf(target), 0, this);
  return this;
};
