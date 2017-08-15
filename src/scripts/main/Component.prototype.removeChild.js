Component.prototype.removeChild = function (child) {
  this.document.removeChild.call(this, child);
  return this;
};
