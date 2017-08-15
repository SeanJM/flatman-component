Component.prototype.removeChild = function () {
  this.document.removeChild.call(this);
  return this;
};
