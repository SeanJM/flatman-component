Component.prototype.closest = function (constructor) {
  var p = this.parentComponent;

  while (p) {
    if (p instanceof constructor) {
      return p;
    }
    p = p.parentComponent;
  }

  return false;
};
