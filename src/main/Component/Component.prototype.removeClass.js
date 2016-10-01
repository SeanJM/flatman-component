Component.prototype.removeClass = function (className) {
  this.node.document.removeClass(className);
  return this;
};
