Component.prototype.after = function (target) {
  this.document.after.call(this, target);
  return this;
};
