Component.prototype.closest = function (selector) {
  var p = this.parentComponent;

  if (Component.lib[selector]) {
    selector = Component.lib[selector];
    while (p) {
      if (p instanceof selector) {
        return p;
      }
      p = p.parentComponent;
    }
  } else {
    return this.node.document.closest(selector);
  }

  return false;
};
