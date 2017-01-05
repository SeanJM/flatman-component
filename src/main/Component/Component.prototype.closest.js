Component.prototype.closest = function (constructor) {
  var p = this.parentNode;

  while (p) {
    if (p instanceof constructor) {
      return p;
    }
    p = p.parentNode;
  }

  return false;
};
