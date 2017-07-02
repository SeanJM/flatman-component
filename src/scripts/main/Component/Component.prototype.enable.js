Component.prototype.enable = function () {
  this.document.enable();
  this.document.childNodes.forEach(function (a) {
    a.enable();
  });
  return this;
};
