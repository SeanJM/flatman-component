Component.prototype.appendTo = function (target) {
  this.node.document.appendTo(target);
  this.parentNode = target;
  return this;
};
