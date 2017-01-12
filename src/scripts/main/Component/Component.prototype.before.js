Component.prototype.before = function (target) {
  var childNodes = this.parentComponent.childNodes;

  if (typeof target === 'undefined') {
    return childNodes[childNodes.indexOf(target) - 1];
  }

  this.node.document.before(target);
  childNodes.splice(childNodes.indexOf(this), 0, target);

  return this;
};
