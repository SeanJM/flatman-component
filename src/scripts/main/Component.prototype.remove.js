Component.prototype.remove = function () {
  this.document.remove.call(this);
  return this;
};
