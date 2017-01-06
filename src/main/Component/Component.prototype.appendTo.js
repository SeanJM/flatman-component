Component.prototype.appendTo = function (target) {
  target = el(target);
  this.node.document.appendTo(target);
  this.parentNode = target;
  return this;
};
