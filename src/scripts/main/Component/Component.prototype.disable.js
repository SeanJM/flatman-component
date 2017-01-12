Component.prototype.disable = function () {
  this.node.document.disable();
  this.node.document.childNodes.forEach(function (a) {
    a.disable();
  });
  return this;
};
