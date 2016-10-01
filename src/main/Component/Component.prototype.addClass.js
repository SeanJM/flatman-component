Component.prototype.addClass = function (className) {
  this.node.document.addClass(className);
  return this;
};
