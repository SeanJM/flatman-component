Component.prototype.appendTo = function (parentNode) {
  this.document.appendTo(parentNode);
  this.parentNode = parentNode;
  return this;
};
