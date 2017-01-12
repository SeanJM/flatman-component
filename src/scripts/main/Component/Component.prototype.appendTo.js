Component.prototype.appendTo = function (target) {
  target = typeof el === 'function'
    ? el(target)
    : target;

  this.node.document.appendTo(target);
  this.parentNode = target;

  return this;
};
