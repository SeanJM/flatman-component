Component.prototype.after = function (target) {
  if (typeof target === 'undefined') {
    return this.node.document.after();
  }
  this.node.document.after(target);
  this.parentNode = target.parentNode;
  this.parentNode.childNodes.push(this);
  return this;
};
