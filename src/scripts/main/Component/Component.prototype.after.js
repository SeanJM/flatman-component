Component.prototype.after = function (target) {
  var childNodes = this.parentComponent.childNodes;

  if (typeof target === 'undefined') {
    return childNodes[childNodes.indexOf(target) + 1];
  }

  this.document.after(target);
  childNodes.splice(childNodes.indexOf(this) + 1, 0, target);

  return this;
};
