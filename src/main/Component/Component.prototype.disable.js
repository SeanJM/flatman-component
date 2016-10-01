Component.prototype.disable = function () {
  var i = 0;

  var n = this.elements
    ? this.elements.length
    : 0;

  for (; i < n; i++) {
    this.elements[i].disable();
  }

  this.node.document.disable();

  return this;
};
