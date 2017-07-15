Component.prototype.closest = function (selector) {
  return this.document.closest.call(this, selector);
};
