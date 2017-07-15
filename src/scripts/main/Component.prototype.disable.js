Component.prototype.disable = function () {
  this.document.disable();
  this.document.childNodes.forEach(function (a) {
    a.disable();
  });
  return this;
};
