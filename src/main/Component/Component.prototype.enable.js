Component.prototype.enable = function () {
  var i = 0;

  var n = this.elements
    ? this.elements.length
    : 0;

  for (; i < n; i++) {
    this.elements[i].enable();
  }

  this.node.document.enable();

  return this;
};
