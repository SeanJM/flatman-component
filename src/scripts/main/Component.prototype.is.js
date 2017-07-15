Component.prototype.is = function (selector) {
  return this.document.is.call(this, selector);
};
