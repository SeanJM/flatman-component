// 'this' is appended before target
Component.prototype.before = function (target) {
  this.document.before.call(this, target);
  return this;
};
