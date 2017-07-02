Component.prototype.remove = function () {
  var childNodes = this.parentNode.childNodes;
  childNodes.splice(childNodes.indexOf(this), 1);
  this.node.parentNode.removeChild(this.node);
  return this;
};
